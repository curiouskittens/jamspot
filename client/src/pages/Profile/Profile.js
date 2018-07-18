import React, { Component } from "react";
import api from "../../utils/api";
import md5 from "js-md5";
import moment from "moment";
import "./Profile.css";
import Footer from "../../components/Footer";

class Profile extends Component {
    state = {
        name: "",
        username: "",
        email: "",
        image: "",
        memberSince: "",
        bio: "",
        instruments: [],
        genres: []
    }

    componentDidMount() {
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
                console.log(this.state.image);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="profile-page-bg">
                <div className="profile-page-content container-fluid">
                    <img src={this.state.image} alt="Gravatar" />
                    <p>{this.state.name}</p>
                    <p>@{this.state.username}</p>
                    <p>Member since {moment(this.state.memberSince).format("MMMM D, YYYY")}</p>
                    <p>{this.state.bio}</p>
                    <p>{this.state.instruments}</p>
                    <p>{this.state.genres}</p>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Profile;