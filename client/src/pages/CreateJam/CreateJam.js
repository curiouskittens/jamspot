import React, { Component } from "react";
import api from "../../utils/api";

class CreateJam extends Component {
    state = {
        jamName: "",
        description: "",
        date: "",
        location: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("hooray! you have submitted!!")
        const newJam = {
            name: this.state.jamName,
            description: this.state.description,
            date: this.state.date,
            location: this.state.location
        }
        console.log(newJam)


        // if (!this.state.username) {
        //     console.log("Please enter your username.");
        // } else if (!this.state.password) {
        //     console.log("Please enter your password.");
        // } else {
        //     api.login({
        //         username: this.state.username,
        //         password: this.state.password
        //     })
        //     .then(passwordMatch => {
        //         if (passwordMatch.data) {
        //             console.log("Login successful.");
        //         } else {
        //             console.log("Sorry, your login information was incorrect.");
        //         }
        //     })
        //     .catch(err => console.log(err));
        // }
    }
    
    render() {
        return (
            <form>
                <label htmlFor="jam-name">Jam Name:</label>
                <input
                    type="text"
                    id="jam-name"
                    name="jamName"
                    value={this.state.jamName}
                    onChange={this.handleInputChange}
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                />
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                />
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleFormSubmit}>Create Jam</button>
            </form>
        )
    }
}

export default CreateJam;