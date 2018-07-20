import React, { Component } from "react";
import api from "../../utils/api";
import "./CreateJam.css";
import Footer from "../../components/Footer";
import InstrumentInput from "../../components/InstrumentInput"
import GenreInput from "../../components/GenreInput"
import sweetAlert from "../../utils/sweetAlert";

class CreateJam extends Component {
    state = {
        jamName: "",
        description: "",
        date: "",
        location: "",
        instruments:[{ name: "", quantity: "" }],
        genres: [""]
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleInstrumentNameChange = (idx) => (evt) => {
        const newinstruments = this.state.instruments.map((instrument, sidx) => {
          if (idx !== sidx) return instrument;
          return { ...instrument, name: evt.target.value };
        });
        
        this.setState({ instruments: newinstruments });
    }

    handleInstrumentQuantityChange = (idx) => (evt) => {
        const newinstruments = this.state.instruments.map((instrument, sidx) => {
          if (idx !== sidx) return instrument;
          return { ...instrument, quantity: evt.target.value };
        });
        
        this.setState({ instruments: newinstruments });
    }
    
    handleAddInstrument = () => {
        this.setState({ instruments: this.state.instruments.concat([{ name: '', quantity: '' }]) });
    }
    
    handleRemoveInstrument = (idx) => () => {
        this.setState({ instruments: this.state.instruments.filter((s, sidx) => idx !== sidx) });
    }

    handleGenreNameChange = (idx) => (evt) => {
        const newGenres = this.state.genres.map((genre, sidx) => {
          if (idx !== sidx) return genre;
          return evt.target.value;
        });
        
        this.setState({ genres: newGenres});
    }
    handleAddGenre = () => {
        this.setState({ genres: this.state.genres.concat([ "" ]) });
    }
    
    handleRemoveGenre = (idx) => () => {
        this.setState({ genres: this.state.genres.filter((s, sidx) => idx !== sidx) });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        const blankInstruments = this.state.instruments.filter(val => val.name === "");
        const blankInstrumentSkillLevel = this.state.instruments.filter(val => val.quantity === "");
        const blankGenres = this.state.genres.filter(val => val === "");
        if (!this.state.jamName) {
            sweetAlert("error", "warning-text", "Please enter a jam name.")
        } else if (!this.state.description) {
            sweetAlert("error", "warning-text", "Please add a description to this jam.")
        } else if (!this.state.date) {
            sweetAlert("error", "warning-text", "Please add a date of the jam event.")
        } else if (!this.state.location) {
            sweetAlert("error", "warning-text", "Please add a location of the jam event.")
        } else if (!this.state.instruments[0] || this.state.instruments[0].name === "" || this.state.instruments[0].quantity === "" || this.state.instruments[0].quantity === "#") {
            sweetAlert("error", "warning-text", "Please add an instrument with skill level requirement.")
        } else if (blankInstruments.length) {
            sweetAlert("error", "warning-text", "Please delete the blank instrument.")
        } else if (blankInstrumentSkillLevel.length) {
            sweetAlert("error", "warning-text", "Please enter a skill level for the instrument.")
        } else if (!this.state.genres[0] || this.state.genres[0] === "") {
            sweetAlert("error", "warning-text", "Please add a genre for your jam.")
        } else if (blankGenres.length) {
            sweetAlert("error", "warning-text", "Please delete the blank genre.")
        } else {
            const newJam = {
                name: this.state.jamName,
                description: this.state.description,
                date: this.state.date,
                location: this.state.location,
                instruments: this.state.instruments,
                genres: this.state.genres,
                admin: sessionStorage.getItem("userId"),
                members: [sessionStorage.getItem("userId")]
            }
            api.createJam(newJam)
                .then(() => {
                    sweetAlert("success", "success-text", "Jam created!");
                    this.setState({
                        jamName: "",
                        description: "",
                        date: "",
                        location: "",
                        instruments: [{ name: "", quantity: "#" }],
                        genres: [""]
                    })
                })
                .catch(err => console.log(err));
        }
    }
    
    render() {
        return (
            <div className="create-jam-page-bg">
                <div className="create-jam-page-content container-fluid">
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
                        <br/><br/>
                        <br/><br/>
                        <h4>instruments</h4>
                        {this.state.instruments.map((instrument, idx) => (
                            <InstrumentInput 
                                instrument={instrument} 
                                nameChangeHandler={this.handleInstrumentNameChange(idx)}
                                quantityChangeHandler={this.handleInstrumentQuantityChange(idx)} 
                                removeHandler={this.handleRemoveInstrument(idx)}
                                key={`${idx}`}
                            />
                        ))}
                        <button type="button" onClick={this.handleAddInstrument} className="small">Add instrument</button>
                        <br/><br/>
                        <h4>Genres</h4>
                        {this.state.genres.map((genre, idx) => (
                            <GenreInput
                                genre={genre} 
                                nameChangeHandler={this.handleGenreNameChange(idx)}
                                removeHandler={this.handleRemoveGenre(idx)}
                                key={`${idx}`}
                            />
                        ))}
                        <button type="button" onClick={this.handleAddGenre} className="small">Add genre</button>
                        <br/><br/>
                        <button onClick={this.handleFormSubmit}>Create Jam</button>
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CreateJam;