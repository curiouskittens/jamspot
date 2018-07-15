import React, { Component } from "react";
import { Link } from "react-router-dom";
import emailValidator from "../../utils/emailValidator";
import api from "../../utils/api";

class SignUp extends Component {
    state = {
        name: "",
        email: "",
        username: "",
        usernameTaken: false,
        password: ""
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
                    console.log("Sorry, this username is not available.")
                    this.setState({
                        usernameTaken: true
                    })
                } else {
                    console.log("That username is up for grabs.");
                    this.setState({
                        usernameTaken: false
                    })
                }
            })
            .catch(err => console.log(err));
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();

        if (!this.state.name) {
            console.log("Please enter your name.");
        } else if (!this.validateEmail(this.state.email)) { 
            console.log("Please enter a valid email address.")
        } else if (!this.state.username || this.state.usernameTaken) {
            console.log("Please enter a valid username.");
        } else if (this.state.password.length < 6) {
            console.log("Please enter a valid password.");
        } else {
            api.createUser({
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
            .then(() => {
                console.log("User created.");
                this.setState({
                    name: "",
                    email: "",
                    username: "",
                    password: ""
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

    render() {
        return (
            <React.Fragment>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
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
                    <button onClick={this.handleFormSubmit}>Sign Up</button>
                </form>
                <p>Already have an account? Log in <Link to="/login">here</Link>.</p>
            </React.Fragment>
        )
    }
}

export default SignUp;