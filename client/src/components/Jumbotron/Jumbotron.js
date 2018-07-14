import React from "react";
import { Link } from "react-router-dom";
import "./Jumbotron.css"

const Jumbotron = () => (
    <div className="jumbotron jumbotron-fluid">
        <div className="container align-items-center">
            <h1 className="display-4 jumbotron-title-style text-center">Jamspot</h1>
            <p className="lead jumbotron-lead-style text-center">Find and connect with fellow musicians to set up a jam session, collaborate and create the next big hit!</p>
            <div className="container text-center">
                <Link to="/login"><button className="btn btn-primary btn-lg jumbotron-button-style">Log In</button></Link>
                <Link to="/signup"><button className="btn btn-primary btn-lg jumbotron-button-style">Sign Up</button></Link>
            </div>
        </div>
    </div>
)

export default Jumbotron;