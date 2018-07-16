import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./Login.css";
import api from "../../utils/api";

class Login extends Component {
    state = {
        username: "",
        password: "",
        loggedIn: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();

        if (!this.state.username) {
            console.log("Please enter your username.");
        } else if (!this.state.password) {
            console.log("Please enter your password.");
        } else {
            api.login({
                username: this.state.username,
                password: this.state.password
            })
            .then(loginResult => {
                this.setState({ loggedIn: loginResult.data.isMatch });
                this.props.loginUser(loginResult.data.isMatch);
                
                if (loginResult.data.isMatch) {
                    console.log("Login successful.");
                    sessionStorage.setItem("userId", loginResult.data.userId);
                } else {
                    console.log("Sorry, your login information was incorrect.");
                }
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className="log-in-bg">
                <div className="log-in-wrapper container">
                    <form className="log-in-form">
                        <p className="log-in-title-style text-center">Log In</p>
                        <hr className="log-in-separator" />
                        <div className="form-group">
                            <label className="log-in-label-text" htmlFor="username">Username:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="log-in-label-text" htmlFor="password">Password:</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button className="log-in-btn btn btn-lg btn-primary" onClick={this.handleFormSubmit}>Log In</button>
                    </form>
                    <p className="login-to-sign-up-text">Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
                    { this.state.loggedIn && <Redirect to="/" /> }
                </div>
            </div>
        )
    }
}

export default Login;