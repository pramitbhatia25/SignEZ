import React, { useEffect, useState } from 'react';
import './index.css';
import { UPDATE_POINTS_API_URL } from '../../../apiConfig'; // Import the API URL
import ClockLoader from "react-spinners/ClockLoader";
import { Link } from 'react-router-dom';


function ReceivePoints(props) {
  console.log(props.points)
  console.log(props.user.email)
  const [loading, setLoading] = useState(false); // Track loading state


  const addPoints = async () => {
    setLoading(true); // Set loading state
    
    try {
      const response = await fetch(UPDATE_POINTS_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          points: props.user.points + props.points,
          email: props.user.email,
        }),
      });
    
      if (response.ok) {
        console.log('Points updated successfully');
        setLoading(false)
      } else {
        console.log('Failed to update points');
      }
    } catch (error) {
      console.error('An error occurred during points update:', error);
    }
  }

  useEffect(() => {
    addPoints()
  }, [])

  function gotoprac() {
    window.location = "/practice"
  }

  function gotoredeem() {
    window.location = "/redeem"
  }

  function gotostats() {
    window.location = "/stats"
  }

  return (
    <div className='logInStyles'>
      <div className="join">
        <div className="join-content">

          {
            loading ? <>
              <ClockLoader
                color={"black"}
                size={'30px'}
              />
              <h2>Adding your Points...</h2>
            </> :
              <>
                <h2>Congratulations {props.user.name}! You've received {props.points} points!</h2>
                <div className={props.signedIn ? "btns signedinbtns" : "btns"}>
                  <button onClick={gotostats} className="btn_link dashboard" style={{ marginRight: '10px' }}>
                    <div className="btn1 try_btn dashboard" style={{ background: 'black', color: 'aqua' }}>
                      view stats
                    </div>
                  </button>

                  <button onClick={gotoredeem} className="btn_link redeem" style={{ marginRight: '10px' }}>
                    <div className="btn1 try_btn redeem" style={{ background: 'black', color: 'aqua' }}>
                      redeem points
                    </div>
                  </button>
                  <button onClick={gotoprac} className="btn_link" style={{ marginRight: '10px' }}>
                    <div className="btn1 try_btn" style={{ background: 'black', color: 'aqua' }}>
                      practice again!
                    </div>
                  </button>
                </div>
              </>
          }


        </div>
      </div>
    </div>
  );
}

export default ReceivePoints;
