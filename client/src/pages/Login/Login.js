import React, { Component } from "react";
import api from "../../utils/api";

class Login extends Component {
    state = {
        username: "",
        password: ""
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
            .then(passwordMatch => {
                if (passwordMatch.data) {
                    console.log("Login successful.");
                } else {
                    console.log("Sorry, your login information was incorrect.");
                }
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return (
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
        )
    }
}

export default Login;