import React, { Component } from "react";
import api from "../../utils/api";
import md5 from "js-md5";
import moment from "moment";

class Profile extends Component {
    state = {
        name: "",
        username: "",
        email: "",
        image: "",
        memberSince: "",
        bio: "",
        instruments: [],
        genres: [],
        bioDisable: true,
        instrumentsDisabled: true,
        genresDisabled: true
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        api.getProfile(sessionStorage.getItem("userId"))
            .then(profile => {
                const gravatarHash = md5(profile.data.email.trim().toLowerCase())
                this.setState({
                    name: profile.data.name,
                    username: profile.data.username,
                    image: `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`,
                    memberSince: profile.data.dateCreated,
                    bio: profile.data.bio,
                    instruments: profile.data.instruments,
                    genres: profile.data.genres
                })
            })
            .catch(err => console.log(err));
    }

    toggleEdit = event => {
        const toggler = event.target.id;
        const toggleComponent = toggler.split("D")[0]
        this.setState(prevState => ({ [toggler]: !prevState[toggler] }), () => this.focusInput(toggleComponent));

        const togglerType = event.target.nodeName.toLowerCase();
        if (togglerType === "button") {
            this.saveProfile(toggleComponent);
        }
    }

    focusInput = inputId => {
        document.getElementById(inputId).focus();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    saveProfile = updatedComponent => {
        api.updateProfile(sessionStorage.getItem("userId"), {
            [updatedComponent]: this.state[updatedComponent]
        })
            .then(() => this.getProfile())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <a href="https://en.gravatar.com/" target="react/jsx-no-target-blank"><img src={this.state.image} alt="Gravatar" /></a>
                <p>{this.state.name}</p>
                <p>@{this.state.username}</p>
                <p>Member since {moment(this.state.memberSince).format("MMMM D, YYYY")}</p>

                <h3>Bio
                {this.state.bioDisable ? (
                    <i className="fas fa-edit" id="bioDisable" onClick={this.toggleEdit}></i>
                ) : (
                    <button id="bioDisable" onClick={this.toggleEdit}>Save</button>
                )}</h3>
                {!this.state.bio && <p>Hmm, looks like there's nothing here. Why don't you tell us a bit about yourself?</p>}
                <textarea 
                    id="bio" 
                    name="bio" 
                    value={this.state.bio}
                    disabled={this.state.bioDisable} 
                    onChange={this.handleInputChange}
                />

                <h3>Instruments<i className="fas fa-edit"></i></h3>
                <p>{this.state.instruments}</p>
                <h3>Genres<i className="fas fa-edit"></i></h3>
                <p>{this.state.genres}</p>
            </div>
        )
    }
}

export default Profile;