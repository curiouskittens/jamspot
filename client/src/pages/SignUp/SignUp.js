import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./SignUp.css";
import emailValidator from "../../utils/emailValidator";
import api from "../../utils/api";
import sweetAlert from "../../utils/sweetAlert";

class SignUp extends Component {
    state = {
        name: "",
        email: "",
        username: "",
        usernameTaken: false,
        password: "",
        signedUp: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })

        if (name === "username" && value) {
            api.checkUsername(value)
                .then(result => {
                    if (result.data) {
                        this.setState({ usernameTaken: true })
                    } else {
                        this.setState({ usernameTaken: false })
                    }
                })
                .catch(err => console.log(err));
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();

        if (!this.state.name) {
            sweetAlert("error", "warning-text", "Please enter your name.");
        } else if (!this.validateEmail(this.state.email)) {
            sweetAlert("error", "warning-text", "Please enter a valid email address.");
        } else if (!this.state.username || this.state.usernameTaken) {
            sweetAlert("error", "warning-text", "Please enter a valid username.");
        } else if (this.state.password.length < 6) {
            sweetAlert("error", "warning-text", "Please enter a valid password.");
        } else {
            api.createUser({
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
                .then(() => {
                    sweetAlert("success", "success-text", "Account created!");
                    this.setState({
                        name: "",
                        email: "",
                        username: "",
                        password: "",
                        signedUp: true
                    })
                })
                .catch(err => console.log(err));
        }
    }

    validateEmail = email => {
        if (email.match(emailValidator)) {
            return true;
        } else {
            return false;
        }
    }

    renderUsernameStatus = () => {
        if (this.state.usernameTaken) {
            return (
                <small className="not-available-username">&times; Sorry, this username is not available.</small>
            )
        } else if (this.state.username && this.state.usernameTaken === false) {
            return (
                <small className="available-username">✔ That username is up for grabs.</small>
            )
        }
    }

    render() {
        return (
            <div className="sign-up-bg">
                <div className="sign-up-wrapper container">
                    <form className="sign-up-form">
                        <p className="sign-up-title-style text-center">Sign Up</p>
                        <hr className="sign-up-separator" />
                        <div className="form-group">
                            <label className="sign-up-label-text" htmlFor="name">Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="sign-up-label-text" htmlFor="email">Email:</label>
                            <input
                                className="form-control"
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="sign-up-label-text" htmlFor="username">Username:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                            />
                            {this.renderUsernameStatus()}
                        </div>
                        <div className="form-group">
                            <label className="sign-up-label-text" htmlFor="password">Password:</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button className="sign-up-btn btn btn-lg btn-primary" onClick={this.handleFormSubmit}>Sign Up</button>
                    </form>
                    <p className="sign-up-to-login-text">Already have an account? Log in <Link to="/login">here</Link>.</p>
                    {this.state.signedUp && <Redirect to="/profile" />}
                </div>
            </div>
        )
    }
}

export default SignUp;