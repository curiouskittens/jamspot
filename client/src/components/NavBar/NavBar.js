import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => (
    <nav className="nav navbar-height navbar-semi-transparent align-items-center">
        <Link to="/" className="nav-link active navbar-text-style1">Jamspot</Link>
        <Link to="/login" className="nav-link navbar-text-style2">Log In</Link>
        <Link to="/signup" className="nav-link navbar-text-style2">Sign Up</Link>
    </nav>
)

export default NavBar;
