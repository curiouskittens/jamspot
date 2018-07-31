import React, { Component } from "react";
import api from "../../utils/api";
import md5 from "js-md5";
import moment from "moment";
import TextareaAutosize from "react-autosize-textarea";
import InstrumentInput from "../../components/InstrumentInput";
import GenreInput from "../../components/GenreInput";
import Footer from "../../components/Footer";
import NoMatch from "../NoMatch";

class ProfileView extends Component {
    state = {
        name: "",
        username: "",
        email: "",
        image: "",
        memberSince: "",
        bio: "",
        instruments: [{ name: "", skill: "" }],
        genres: [""],
        soundcloud: "",
        defaultInstrumentSkillBar: "instrument-skill-change-section d-flex justify-content-around skillbar-background",
        profileFound: true
    }

    componentDidMount() {
        this.getProfile(this.props.username);
    }

    getProfile = username => {
        api.getProfileView(username)
            .then(profile => {
                if (profile.data) {
                    const gravatarHash = md5(profile.data.email.trim().toLowerCase())
                    this.setState({
                        name: profile.data.name,
                        username: profile.data.username,
                        image: `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=300`,
                        memberSince: profile.data.dateCreated,
                    })

                    if (profile.data.bio) this.setState({ bio: profile.data.bio });
                    if (profile.data.instruments[0].name) this.setState({ instruments: profile.data.instruments });
                    if (profile.data.genres[0]) this.setState({ genres: profile.data.genres });
                    if (profile.data.soundcloud) this.setState({ soundcloud: profile.data.soundcloud });
                } else {
                    this.setState({ profileFound: false });
                }
            })
            .catch(err => console.log(err));
    }

    doNothing = () => {
        console.log("nothing");
    }

    render() {
        return (
            <React.Fragment>
                {this.state.profileFound ? (
                    <div className="profile-page-bg">
                        <div className="profile-page-content container-fluid">
                            <div className="container d-md-flex justify-content-around profile-sections-wrapper">
                                <div className="col-md-4 profile-page-photo-section">
                                    <a href="https://en.gravatar.com/" target="react/jsx-no-target-blank"><img src={this.state.image} className="profile-photo-style" alt="Gravatar" /></a>
                                    <br /><br />
                                    <p className="profile-photo-section-name">{this.state.name}</p>
                                    <p className="profile-photo-section-username">@{this.state.username}</p>
                                    <p className="profile-photo-section-since">Member since {moment(this.state.memberSince).format("MMMM D, YYYY")}</p>

                                    <p className="profile-info-sub-title">Soundcloud</p>
                                    <hr className="profile-page-separator" />
                                    {this.state.soundcloud ? (
                                        <iframe title="soundcloud" width="100%" height="300" scrolling="no" frameBorder="no"
                                            src={`https://w.soundcloud.com/player/?url=https://soundcloud.com/${this.state.soundcloud}`}>
                                        </iframe>
                                    ) : (
                                        <p>{this.state.name} has not added a Soundcloud account.</p>
                                    )}
                                </div>

                                <div className="col-md-7 profile-page-info-section">
                                    <p className="text-center profile-info-title">{this.state.name}'s Profile <i className="fas fa-user"></i></p>
                                    <div className="profile-bio-section">
                                        <p className="profile-info-sub-title">Bio</p>
                                        <hr className="profile-page-separator" />
                                        {this.state.bio ? (
                                            <TextareaAutosize
                                                rows={1}
                                                value={this.state.bio}
                                                disabled={true}
                                                className="form-control bio-textarea"
                                            />
                                        ) : (
                                            <p>{this.state.name} has not added a bio.</p>
                                        )}
                                    </div>

                                    <div className="profile-instrument-section">
                                        <p className="profile-info-sub-title">Instruments</p>
                                        <hr className="profile-page-separator" />
                                        {this.state.instruments[0].name ? this.state.instruments.map((instrument, idx) => (
                                            <div key={`${idx}`} id="instruments">
                                                <InstrumentInput
                                                    disabled={true}
                                                    radioIndex={idx}
                                                    instrument={instrument}
                                                    instrumentBar={this.state.defaultInstrumentSkillBar}
                                                    skillChangeHandler={this.doNothing}
                                                />
                                            </div>
                                        )) : (
                                            <p>{this.state.name} has not added any instruments.</p>
                                        )}
                                    </div>

                                    <div className="profile-genre-section">
                                        <p className="profile-info-sub-title">Genres</p>
                                        <hr className="profile-page-separator" />
                                        {this.state.genres[0] ? this.state.genres.map((genre, idx) => (
                                            <div key={`${idx}`} id="genres">
                                                <GenreInput
                                                    disabled={true}
                                                    genre={genre}
                                                />
                                            </div>
                                        )) : (
                                            <p>{this.state.name} has not added any genres.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                ) : (
                    <NoMatch />
                )}
            </React.Fragment>
        )
    }
}

export default ProfileView;