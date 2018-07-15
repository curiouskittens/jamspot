import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
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
            <React.Fragment>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleFormSubmit}>Log In</button>
                </form>
                <p>Don't have an account? Sign up <Link to="/signup">here</Link>.</p>
                { this.state.loggedIn && <Redirect to="/" /> }
            </React.Fragment>
        )
    }
}

export default Login;