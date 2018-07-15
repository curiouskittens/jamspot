import React from "react";
import { Link } from "react-router-dom";
import "./Jumbotron.css"

const Jumbotron = () => (
    <div className="jumbotron jumbotron-fluid jumbotron-bg">
        <div className="container align-items-center">
            <h1 className="display-4 jumbotron-title-style text-center">Jamspot</h1>
            <p className="lead jumbotron-lead-style text-center">Connect. Collaborate. Create.</p>
            <div className="container text-center">
                <Link to="/signup"><button className="btn btn-outline-primary btn-lg jumbotron-button-style">Let's Jam!</button></Link>
            </div>
        </div>
    </div>
)

export default Jumbotron;