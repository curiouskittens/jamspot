import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
    state = {
        navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-initial-color"],
    }

    handleScroll = () => {
        let st = window.pageYOffset;
        if (st > 0) {
            this.setState({
                navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-semi-transparent"]
            })
        } else if (st === 0) {
            this.setState({
                navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-initial-color"]
            })
        }
    }

    handleLogOut = () => {
        console.log("User logged out.")
        sessionStorage.clear();
        this.props.loggedIn = false;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
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
                            <Link to="/profile" className="nav-link navbar-text-style2">Profile</Link>
                            <Link to="/myjams" className="nav-link navbar-text-style2">My Jams</Link>
                            <Link to="/createjam" className="nav-link navbar-text-style2">Create A Jam</Link>
                            <Link to="/findjam" className="nav-link navbar-text-style2">Find A Jam</Link>
                            <Link onClick={this.handleLogOut} to="/" className="nav-link navbar-text-style2">Log Out</Link>
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
