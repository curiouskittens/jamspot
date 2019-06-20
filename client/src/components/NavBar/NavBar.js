import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import sweetAlert from "../../utils/sweetAlert";

class NavBar extends Component {
  state = {
    navbarInitialClass: [
      "nav",
      "navbar-config",
      "navbar-height",
      "align-items-center",
      "navbar-initial-color",
      "navbar",
      "navbar-expand-xl"
    ],
    navtoggleInitialClass: "navbar-toggler-text",
    activeTabStyle: "active-tab-style",
    collapsed: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let st = window.pageYOffset;
    if (st > 0) {
      this.setState({
        navbarInitialClass: [
          "nav",
          "navbar-config",
          "navbar-height",
          "navbar-semi-transparent",
          "navbar",
          "navbar-expand-xl"
        ],
        navtoggleInitialClass: "navbar-toggler-text-clicked",
        activeTabStyle: "active-tab-style-scrolled"
      });
    } else if (st === 0) {
      this.setState({
        navbarInitialClass: [
          "nav",
          "navbar-config",
          "navbar-height",
          "navbar-initial-color",
          "navbar",
          "navbar-expand-xl"
        ],
        navtoggleInitialClass: "navbar-toggler-text",
        activeTabStyle: "active-tab-style"
      });
    }
  };

  handleLogout = () => {
    sessionStorage.clear();
    this.props.loginUser(false);
    sweetAlert("success", "success-text", "Logout successful!");
  };

  render() {
    return (
      <nav className={this.state.navbarInitialClass.join(" ")}>
        <NavLink to="/" className="nav-link active navbar-text-style1">
          Jamspot
        </NavLink>
        {this.props.loggedIn ? (
          <React.Fragment>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className={this.state.navtoggleInitialClass}>
                <i className="fas fa-bars" />
              </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav to-the-right text-center">
                <li
                  className="nav-item active"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink
                    to="/"
                    exact
                    activeClassName={this.state.activeTabStyle}
                    className="nav-link navbar-text-style2"
                  >
                    Home
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink
                    to="/profile"
                    activeClassName={this.state.activeTabStyle}
                    className="nav-link navbar-text-style2"
                  >
                    Profile
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink
                    to="/myjams"
                    activeClassName={this.state.activeTabStyle}
                    className="nav-link navbar-text-style2"
                  >
                    My Jams
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink
                    to="/createjam"
                    activeClassName={this.state.activeTabStyle}
                    className="nav-link navbar-text-style2"
                  >
                    Create A Jam
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink
                    to="/findjam"
                    activeClassName={this.state.activeTabStyle}
                    className="nav-link navbar-text-style2"
                  >
                    Find A Jam
                  </NavLink>
                </li>
                <li className="nav-item log-out-option">
                  <NavLink
                    onClick={this.handleLogout}
                    className="nav-link navbar-text-style2"
                    to="/"
                  >
                    Log Out
                  </NavLink>
                </li>
              </ul>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink
              to="/login"
              activeClassName={this.state.activeTabStyle}
              className="nav-link navbar-text-style2"
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              activeClassName={this.state.activeTabStyle}
              className="nav-link navbar-text-style2"
            >
              Sign Up
            </NavLink>
          </React.Fragment>
        )}
      </nav>
    );
  }
}

export default NavBar;
