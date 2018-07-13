import React from "react";
import "./AppIntro.css";

const AppIntro = () => (
    <div className="app-intro-wrapper container d-xl-flex justify-content-around align-items-center">
        <div className="text-intro-section text-center col-xl-5">
            <p className="app-intro-title-style">What is Jamspot?</p>
            <p className="app-intro-body-text-style">An App That Helps You</p>
            <p className="app-intro-body-text-style">Jam with the Coolest Musicians</p>
            <p className="app-intro-body-text-style">Find the Best Original Music</p>
            <p className="app-intro-body-text-style">Create Your Own Masterpiece</p>
        </div>
        <iframe className="col-xl-6 app-intro-iframe-style" title="Pentatonix Youtube" src="https://www.youtube.com/embed/_NWs7ntMRBA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
)

export default AppIntro;