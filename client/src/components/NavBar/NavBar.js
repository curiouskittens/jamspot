import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
    state = {
        navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-initial-color", "navbar", "navbar-expand-lg"],
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let st = window.pageYOffset;
        if (st > 0) {
            this.setState({
                navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-semi-transparent", "navbar", "navbar-expand-lg"]
            })
        } else if (st === 0) {
            this.setState({
                navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-initial-color", "navbar", "navbar-expand-lg"]
            })
        }
    }

    handleLogout = () => {
        console.log("User logged out.")
        sessionStorage.clear();
        this.props.loggedIn = false;
    }

    render() {
        return (
            <nav className={this.state.navbarInitialClass.join(" ")}>
                <Link to="/" className="nav-link active navbar-text-style1">Jamspot</Link>
                { this.props.loggedIn ? (
                    <React.Fragment>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span>Account</span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to="/profile" className="nav-link navbar-text-style2">Profile</Link>
                                </li>
                                <li className="nav-item">
                                <Link to="/myjams" className="nav-link navbar-text-style2">My Jams</Link>
                                </li>
                                <li className="nav-item">
                                <Link to="/createjam" className="nav-link navbar-text-style2">Create A Jam</Link>
                                </li>
                                <li className="nav-item">
                                <Link to="/findjam" className="nav-link navbar-text-style2">Find A Jam</Link>
                                </li>
                                <li className="nav-item">
                                <Link onClick={this.handleLogout} to="/" className="nav-link navbar-text-style2">Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/login" className="nav-link navbar-text-style2">Log In</Link>
                        <Link to="/signup" className="nav-link navbar-text-style2">Sign Up</Link>
                    </React.Fragment>
                )}
            </nav>
        )
    }


}



export default NavBar;
