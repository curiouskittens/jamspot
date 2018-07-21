import React, { Component } from "react";
import api from "../../utils/api";
import md5 from "js-md5";
import moment from "moment";
import "./Profile.css";
import Footer from "../../components/Footer";
import InstrumentInput from "../../components/InstrumentInput";
import sweetAlert from "../../utils/sweetAlert";

class Profile extends Component {
    state = {
        name: "",
        username: "",
        email: "",
        image: "",
        memberSince: "",
        bio: "",
        instruments:[{ name: "", skill: "" }],
        genres: [""],
        bioDisabled: true,
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
                })

                this.checkEditableInformation(profile.data.bio, profile.data.instruments, profile.data.genres);
            })
            .catch(err => console.log(err));
    }

    checkEditableInformation = (bio, instruments, genres) => {
        if (bio) this.setState({ bio: bio })
        if (instruments.length) this.setState({ instruments: instruments })
        if (genres.length) this.setState({ genres: genres })
    }

    toggleEdit = event => {
        const toggler = event.target.id;
        const toggleComponent = toggler.split("D")[0];

        const togglerType = event.target.nodeName.toLowerCase();
        if (togglerType === "button") {
            if (toggleComponent === "instruments") {
                const blankInstruments = this.state.instruments.filter(instrument => !instrument.name);
                const blankInstrumentsSkill = this.state.instruments.filter(instrument => !instrument.skill);
    
                if (blankInstruments.length) {
                    return sweetAlert("error", "warning-text", "Please delete or fill out the blank instrument.")
                } else if (blankInstrumentsSkill.length) {
                    return sweetAlert("error", "warning-text", "Please enter your skill level for each instrument.")
                }
            }

            this.saveProfile(toggleComponent);
        }

        this.setState(prevState => ({ [toggler]: !prevState[toggler] }), () => this.focusInput(toggleComponent));
    }

    focusInput = inputId => {
        document.getElementById(inputId).focus();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleInstrumentNameChange = (idx) => (evt) => {
        const newinstruments = this.state.instruments.map((instrument, sidx) => {
          if (idx !== sidx) return instrument;
          return { ...instrument, name: evt.target.value };
        });
        
        this.setState({ instruments: newinstruments });
    }

    handleInstrumentSkillChange = (idx) => (evt) => {
        const newinstruments = this.state.instruments.map((instrument, sidx) => {
          if (idx !== sidx) return instrument;
          return { ...instrument, skill: evt.target.value };
        });
        
        this.setState({ instruments: newinstruments });
    }
    
    handleAddInstrument = () => {
        this.setState({ instruments: this.state.instruments.concat([{ name: '', skill: '' }]) });
    }
    
    handleRemoveInstrument = (idx) => () => {
        this.setState({ instruments: this.state.instruments.filter((s, sidx) => idx !== sidx) });
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
            <div className="profile-page-bg">
                <div className="profile-page-content container-fluid">
                    <a href="https://en.gravatar.com/" target="react/jsx-no-target-blank"><img src={this.state.image} alt="Gravatar" /></a>
                    <p>{this.state.name}</p>
                    <p>@{this.state.username}</p>
                    <p>Member since {moment(this.state.memberSince).format("MMMM D, YYYY")}</p>

                    <h3>Bio
                    {this.state.bioDisabled ? (
                        <i className="fas fa-edit" id="bioDisabled" onClick={this.toggleEdit}></i>
                    ) : (
                        <button id="bioDisabled" onClick={this.toggleEdit}>Save</button>
                    )}</h3>
                    {!this.state.bio && <p>Hmm, looks like there's nothing here. Why don't you tell us a bit about yourself?</p>}
                    <textarea 
                        id="bio" 
                        name="bio" 
                        value={this.state.bio}
                        disabled={this.state.bioDisabled} 
                        onChange={this.handleInputChange}
                    />

                    <h3>Instruments
                    {this.state.instrumentsDisabled ? (
                        <i className="fas fa-edit" id="instrumentsDisabled" onClick={this.toggleEdit}></i>
                    ) : (
                        <button id="instrumentsDisabled" onClick={this.toggleEdit}>Save</button>
                    )}</h3>
                    {!this.state.instruments.length && <p>Hmm, looks like there's nothing here. Why don't you tell us what instruments you play?</p>}
                    {this.state.instruments.map((instrument, idx) => (
                        <div key={`${idx}`} id="instruments">
                            <InstrumentInput 
                                disabled={this.state.instrumentsDisabled}
                                radioIndex={idx}
                                instrument={instrument} 
                                nameChangeHandler={this.handleInstrumentNameChange(idx)}
                                skillChangeHandler={this.handleInstrumentSkillChange(idx)} 
                                removeHandler={this.handleRemoveInstrument(idx)}
                            />
                        </div>
                    ))}
                    {!this.state.instrumentsDisabled && <button disabled={this.state.instrumentsDisabled} type="button" onClick={this.handleAddInstrument} className="btn btn-secondary btn-sm add-buttons">Add instrument</button>}

                    <h3>Genres<i className="fas fa-edit"></i></h3>
                    <p>{this.state.genres}</p>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Profile;