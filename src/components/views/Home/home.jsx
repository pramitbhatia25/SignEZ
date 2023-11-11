import React, { useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Header from "../../shared/Header/header";
import Carousels from "../../shared/Carousel/carousel";
import imga from "../../../assets/images/cool_images/a.png"
function Home(props) {

    return <>
        <div className="page1">
            <Header setSignedIn={props.setSignedIn} signedIn={props.signedIn} openLogIn={props.openLogIn} closeLogIn={props.closeLogIn} openSignUp={props.openSignUp} closeSignUp={props.closeSignUp} />
            <div className="sd">
                <div className="ab">
                    <div className="layer l1">
                        Pramit
                    </div>
                    <div className="layer l2">
                        <img src={imga} alt="sd"></img>
                    </div>
                    <div className="layer l3">
                        Pramit
                    </div>
                </div>
            </div>
            <div className={props.signedIn?"content signedincontent" : "content"}>
                <div className={props.signedIn ? `hero_title signedintitle` : `hero_title`}>
                    {props.signedIn ?
                        "Thank you for making a difference, " + props.user.name + "!" : "An AI-Based Platform to Learn American Sign Language"
                    }

                    {props.signedIn ?
                        <>                        
                        <div className="subtext">                    
                            {"You have "}<div className="points">{props.user.points}</div>{" points."}
                        </div>
                        <div className="subtext">                    
                        Start practicing, earn more points and redeem rewards!
                        </div>
                        </>: <></>
                    }
                    <div className={props.signedIn ? "btns signedinbtns" : "btns"}>
                    {
                        props.signedIn ?
                            <Link to="/stats" className="btn_link">
                                <div className="btn1 try_btn">
                                    view stats
                                </div>
                            </Link>
                            : <></>

                    }
                    {
                        props.signedIn ?
                            <Link to="/redeem" className="btn_link redeem">
                                <div className="btn1 try_btn redeem">
                                    redeem points
                                </div>
                            </Link>
                            : <></>

                    }
                    {
                            props.signedIn ?
                                <Link to="/practice" className="btn_link">
                                    <div className="btn1 try_btn">
                                        start practicing
                                    </div>
                                </Link>
                                :
                                <Link to="/try" className="btn_link">
                                    <div className="btn1 try_btn">
                                        try it out
                                    </div>
                                </Link>
                        }
                        <a href="#about" className="btn_link">
                            <div className="btn1 learn_btn">
                                learn more
                            </div>
                        </a>
                    </div>
                </div>
                {
                    props.signedIn ?
                        <></> :
                        <div className="gif_image">
                            <Carousels />
                        </div>
                }
            </div>
        </div>
        <div id="about" className="about_page">
            <div className="content about_content">
                <div className="hero_title about_hero">
                    {props.signedIn ? "Hi " + props.user.name + ". You've joined a mission to empower millions of disabled individuals to make memories and live a complete life. Team SignEZ thanks you for your help!" : "Empowering the world through ASL. Over 32 million children globally live with significant hearing loss, and approximately 466 million people have disabling hearing loss worldwide. Join us in making a difference."}
                </div>
            </div>
        </div>
    </>
}

export default Home;