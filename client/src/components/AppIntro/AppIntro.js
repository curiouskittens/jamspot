import React from "react";
import "./AppIntro.css";

const AppIntro = () => (
    <div className="app-intro-wrapper container d-xl-flex justify-content-around align-items-center">
        <div className="text-intro-section text-center">
            <p className="app-intro-title-style">What is Jamspot?</p>
            <p className="app-intro-body-text-style">Whether you're a newbie or a pro, there's nothing like playing live music with others who share your passion.</p>
        </div>
        {/* connect */}
        <i class="far fa-handshake"></i>
        {/* collaborate */}
        <i class="far fa-comment-dots"></i>
        {/* create */}
        <i class="fas fa-music"></i>
    </div>
)

export default AppIntro;