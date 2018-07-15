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
            this.setState({ navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-semi-transparent"] })
        } else if (st == 0) {
            this.setState({ navbarInitialClass: ["nav", "navbar-config", "navbar-height", "align-items-center", "navbar-initial-color"] })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <nav className={this.state.navbarInitialClass.join(" ")}>
                <Link to="/" className="nav-link active navbar-text-style1">Jamspot</Link>
                <Link to="/login" className="nav-link navbar-text-style2">Log In</Link>
                <Link to="/signup" className="nav-link navbar-text-style2">Sign Up</Link>
            </nav>
        )
    }


}



export default NavBar;
