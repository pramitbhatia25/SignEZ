import React, { useEffect, useState, useRef } from "react";
import './index.css';
import Header from "../../shared/Header/header";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import Webcam from 'react-webcam';
import ClockLoader from "react-spinners/ClockLoader";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose"
import { drawHand } from "./handposeutil"
import Handsigns from "./handsigns"
import * as fp from "fingerpose"



function Try(props) {


  const letters_to_sign = ['C', 'O', 'T']
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [reviewText, setReviewText] = useState("")
  const [loadModel, setLoadModel] = useState(true)
  const [net, setNet] = useState("")
  let [points, setPoints] = useState(0)

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const toggleCamera = () => {
    if (cameraActive == true) {
      setCameraActive(false);
      setReviewText("Camera Off")
    }
    else {
      setCameraActive(true);
      setReviewText("Detecting...")
    }
  };

  async function loadModelfn() {
    const net = await handpose.load();
    setNet(net);
    setLoadModel(false);
  }

  useEffect(() => {
    loadModelfn()
  }, [])

  useEffect(() => {
    let intervalId; // Initialize a variable to hold the interval ID

    async function detect(net) {
      console.log("DETE")
      if (reviewText === 'Detected') {
        return;
      }

      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video
        const videoWidth = webcamRef.current.video.videoWidth
        const videoHeight = webcamRef.current.video.videoHeight

        // Set video width
        webcamRef.current.video.width = videoWidth
        webcamRef.current.video.height = videoHeight

        // Set canvas height and width
        canvasRef.current.width = videoWidth
        canvasRef.current.height = videoHeight

        // Make Detections
        const hand = await net.estimateHands(video)

        if (hand.length > 0) {
          //loading the fingerpose model
          const GE = new fp.GestureEstimator([
            Handsigns.aSign,
            Handsigns.bSign,
            Handsigns.cSign,
            Handsigns.dSign,
            Handsigns.eSign,
            Handsigns.fSign,
            Handsigns.gSign,
            Handsigns.hSign,
            Handsigns.iSign,
            Handsigns.jSign,
            Handsigns.kSign,
            Handsigns.lSign,
            Handsigns.mSign,
            Handsigns.nSign,
            Handsigns.oSign,
            Handsigns.pSign,
            Handsigns.qSign,
            Handsigns.rSign,
            Handsigns.sSign,
            Handsigns.tSign,
            Handsigns.uSign,
            Handsigns.vSign,
            Handsigns.wSign,
            Handsigns.xSign,
            Handsigns.ySign,
            Handsigns.zSign,
          ])

          const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5)
          const ctx = canvasRef.current.getContext("2d")
          drawHand(hand, ctx)

          if (estimatedGestures.gestures.length !== 0) {
            const sortedList = estimatedGestures.gestures.sort();
            const maxValue = sortedList[sortedList.length - 1];
            console.log(maxValue.name)
            if (maxValue.name === letters_to_sign[currentLetterIndex]) {
              setReviewText("Detected!");
              setPoints(points + 50);
            setTimeout(() => {
                setReviewText("Detecting...");
                if (currentLetterIndex === letters_to_sign.length - 1) {
                  console.log("ABRA")
                  if (props.signedIn) {
                    window.location = "/practice";
                  } else {
                    setCurrentLetterIndex(0);
                    toggleCamera();
                    setPoints(0);
                    props.openSignUp();
                  }
                } else {
                  setCurrentLetterIndex(currentLetterIndex + 1);
                  setReviewText("Detecting...");
                }

              }, 2000)
            } else {
              setReviewText("Detecting...");
            }
      
          }

        }
      };
    }

    if (cameraActive) {
      // Start the interval only if the camera is active
      intervalId = setInterval(() => {
        detect(net);
      }, 150);
    } else {
      setReviewText("Camera Off 😶");
    }
  
    return () => {
      clearInterval(intervalId);
    };
  

  }, [cameraActive, currentLetterIndex]);

  return (
    <div className="trypage">
      <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />

      <div className="trypage_content">
        {loadModel ?
          <div className="loadModel">
            <div className="loadingModel" style={{ background: 'rgb(0, 0, 0, 0.9)', height: '80vh', width: '80vw', color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

              <ClockLoader
                color={"white"}
                size={'30px'}
              />Loading Model....
            </div>
          </div>
          :
          <>
            <div className="stats">
              <div className="arrow">
                <button className="left_arrow" onClick={() => {
                  if (currentLetterIndex == 0) {
                    window.location = "/try"
                  }
                  else {
                    setCurrentLetterIndex(0)
                    toggleCamera()
                    props.openSignUp()
                  }
                }
                }>
                  {"<"}
                </button>
              </div>
              <div className="stats_middle">
                <p className="current_letter">{letters_to_sign[currentLetterIndex]}</p>
                <p className="review_text">{reviewText}</p>
              </div>
              <div className="stats_middle">
                <p className="current_letter">{points}</p>
                <p className="review_text">Points</p>
              </div>
              <div className="arrow">
                <button className="right_arrow" onClick={() => {
                  if (currentLetterIndex >= letters_to_sign.length - 1) {
                    if (props.signedIn) {
                      window.location = "/practice"
                    }
                    else {
                      setCurrentLetterIndex(0)
                      toggleCamera()
                      setPoints(0)
                      props.openSignUp()
                    }
                  }
                  else {
                    setCurrentLetterIndex(currentLetterIndex + 1);
                    setReviewText("Detecting...");
                  }
                }
                }>
                  {">"}
                </button>
              </div>
            </div>
            <div id='t' className={reviewText == "Detected!" ? "trypage_cam_content aquaborder" : "trypage_cam_content"}>
              {cameraActive && (
                <>
                  <Webcam
                    ref={webcamRef}
                    muted={true}
                    style={{
                      height: '100%',
                      width: 'auto',
                      textAlign: "center",
                      zindex: 9,
                    }}
                  />
                  <canvas
                    className="can"
                    ref={canvasRef}
                    style={{
                      position: "absolute",
                      marginLeft: "auto",
                      marginRight: "auto",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      zindex: 8,
                    }}
                  />
                </>
              )}
              <div className={cameraActive ? 'prompt' : 'prompt prompt1'}>
                {cameraActive && (
                  <div>
                    <img style={{ height: 'auto', width: '200px' }} src={require(`../../../assets/images/sign_icons/${letters_to_sign[currentLetterIndex].toLowerCase()}.jpg`)} alt="Sign" />
                  </div>
                )}
                {!cameraActive && (
                  <div>
                    <p>Turn The Camera On To Start!</p>
                  </div>
                )}
              </div>
            </div>
            <div className="trypage_letter">
              <label className='toggle'>
                Camera On?
                <Toggle
                  checked={cameraActive}
                  className='toggle_s'
                  onChange={toggleCamera}
                />
              </label>
            </div>
          </>
        }
      </div>
    </div>
  );

}

export default Try;