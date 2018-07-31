import React from "react";
import "./AppIntro.css";

const AppIntro = () => (
    <div className="app-intro-wrapper container justify-content-around align-items-center">
        <div className="text-intro-section text-center">
            <p className="app-intro-title-style">What is Jamspot?</p>
            <p className="app-intro-body-text-style">Whether you're a newbie or a pro, there's nothing like playing live music with others who share your passion.</p>
        </div>

        <div className="row justify-content-around pt-4">

            {/* connect */}
            <div className="col-md-4">
                <div className="text-center">
                    <i className="far fa-handshake landing-icon pb-3"></i>
                    <p className="landing-icon-text">Connect</p>
                    <p className="landing-icon-small-text">Create or join a jam to find the coolest musicians around.</p>
                </div>
            </div>

            {/* collaborate */}
            <div className="col-md-4">
                <div className="text-center">
                    <i className="far fa-comment-dots landing-icon pb-3"></i>
                    <p className="landing-icon-text">Collaborate</p>
                    <p className="landing-icon-small-text">Use the jam page to discuss ideas and inspirations.</p>
                </div>
            </div>

            {/* create */}
            <div className="col-md-4">
                <div className="text-center">
                    <i className="fas fa-music landing-icon pb-3"></i>
                    <p className="landing-icon-text">Create</p>
                    <p className="landing-icon-small-text">Meet up and make the next musical masterpiece!</p>
                </div>
            </div>

        </div>
    </div>
)

export default AppIntro;