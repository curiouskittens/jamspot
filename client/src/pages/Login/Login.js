import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./Login.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";

class Login extends Component {
    state = {
        username: "",
        password: "",
        usernameExist: false,
        loggedIn: false
    }

    componentDidMount() {
        let htmlBody = document.getElementsByTagName("html");
        console.log(htmlBody)
        htmlBody[0].style.height = "100%";
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })

        if (name === "username" && value) {
            api.checkUsername(value)
                .then(result => {
                    if (result.data) {
                        console.log("This username is found.");
                        this.setState({
                            usernameExist: true
                        })
                    } else {
                        console.log("This username is not found.");
                        this.setState({
                            usernameExist: false
                        })
                    }
                })
                .catch(err => console.log(err));
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();

        if (!this.state.username) {
            console.log("Please enter your username.");
            let infoMissingText = document.createElement("p");
            infoMissingText.className += "swal-warning-text";
            infoMissingText.innerHTML = "Please enter your username.";
            window.swal({
                content: infoMissingText,
                buttons: false,
                icon: "warning",
                timer: "1500"
            });
        } else if (!this.state.password) {
            console.log("Please enter your password.");
            let infoMissingText = document.createElement("p");
            infoMissingText.className += "swal-warning-text";
            infoMissingText.innerHTML = "Please enter your password.";
            window.swal({
                content: infoMissingText,
                buttons: false,
                icon: "warning",
                timer: "1500"
            });
        } else if (this.state.username !== "" && this.state.usernameExist === false) {
            console.log("User account does not exist.")
            let infoWrongText = document.createElement("p");
            infoWrongText.className += "swal-warning-text";
            infoWrongText.innerHTML = "User account does not exist";
            window.swal({
                content: infoWrongText,
                buttons: false,
                icon: "warning",
                timer: "1500"
            });
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
                        let userLoggedInText = document.createElement("p");
                        userLoggedInText.className += "swal-success-text animated tada";
                        userLoggedInText.innerHTML = "Welcome Back!";
                        window.swal({
                            content: userLoggedInText,
                            timer: 2000,
                        });
                        sessionStorage.setItem("userId", loginResult.data.userId);
                    } else {
                        console.log("Sorry, your login password was incorrect.");
                        let infoWrongText = document.createElement("p");
                        infoWrongText.className += "swal-warning-text";
                        infoWrongText.innerHTML = "Sorry, your login password was incorrect.";
                        window.swal({
                            content: infoWrongText,
                            buttons: false,
                            icon: "warning",
                            timer: "1500"
                        });
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
                    {this.state.loggedIn && <Redirect to="/" />}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Login;