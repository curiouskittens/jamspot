import React from "react";
import "./AppIntro.css";

const AppIntro = () => (
    <div className="app-intro-wrapper container d-xl-flex justify-content-around align-items-center">
        <div className="text-intro-section text-center col-xl-5">
            <p className="app-intro-title-style">What is Jamspot?</p>
            <p className="app-intro-body-text-style">There's nothing like playing live music with others who share your passion.</p>
            <p className="app-intro-body-text-style">Whether you're a newbie or a pro, Jamspot helps you find the coolest musicians around.</p>
            <p className="app-intro-body-text-style">Join a Jam to meet new friends, play some tunes and create the next musical masterpiece!</p>
        </div>
        <iframe className="col-xl-6 app-intro-iframe-style" title="Pentatonix Youtube" src="https://www.youtube.com/embed/_NWs7ntMRBA" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
    </div>
)

export default AppIntro;