import React, { Component } from "react";
import { Redirect } from "react-router";
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
        genres: [""],
        jamCreated: false,
        createdJamId: ""
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

        const blankInstruments = this.state.instruments.filter(val => val.name === "");
        const blankInstrumentsQuantity = this.state.instruments.filter(val => val.quantity === "");
        const blankGenres = this.state.genres.filter(val => val === "");
        const selectedDate = new Date(this.state.date);
        const now = new Date();
        if (!this.state.jamName) {
            sweetAlert("error", "warning-text", "Please enter a jam name.")
        } else if (!this.state.description) {
            sweetAlert("error", "warning-text", "Please add a description.")
        } else if (!this.state.date) {
            sweetAlert("error", "warning-text", "Please add a date.")
        } else if (selectedDate < now) {
            sweetAlert("error", "warning-text", "Please enter a future date.")
        } else if (!this.state.location) {
            sweetAlert("error", "warning-text", "Please add a location.")
        } else if (!this.state.instruments[0] || !this.state.instruments[0].name || !this.state.instruments[0].quantity ) {
            sweetAlert("error", "warning-text", "Please add an instrument and the number of players needed.")
        } else if (blankInstruments.length) {
            sweetAlert("error", "warning-text", "Please delete or fill out the blank instrument.")
        } else if (blankInstrumentsQuantity.length) {
            sweetAlert("error", "warning-text", "Please enter the number of players needed for each instrument.")
        } else if (!this.state.genres[0] || !this.state.genres[0] ) {
            sweetAlert("error", "warning-text", "Please add a genre for your jam.")
        } else if (blankGenres.length) {
            sweetAlert("error", "warning-text", "Please delete or fill out the blank genre.")
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
                .then(createdJam => {
                    sweetAlert("success", "success-text", "Jam created.");
                    this.setState({
                        jamName: "",
                        description: "",
                        date: "",
                        location: "",
                        instruments: [{ name: "", quantity: "" }],
                        genres: [""],
                        jamCreated: true,
                        createdJamId: createdJam.data._id
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
                        <p className="create-jam-form-title text-center">Create a Jam</p>
                        <br/>
                        <div className="create-general-info-wrapper">
                            <h4 className="text-center create-jam-section-title">General Info <i className="fas fa-info-circle"></i></h4>
                            <hr/>
                            <div className="form-group create-jam-input-size">
                                <label htmlFor="jam-name">Jam Name:</label>
                                <input
                                    className="form-control create-jam-input-width"
                                    type="text"
                                    id="jam-name"
                                    name="jamName"
                                    value={this.state.jamName}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group create-jam-input-size">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    className="form-control create-jam-input-width"
                                    type="text"
                                    rows="5"
                                    id="description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                ></textarea>
                            </div>
                            <div className="form-group create-jam-input-size">
                                <label htmlFor="date">Date:</label>
                                <input
                                    className="form-control create-jam-input-width create-jam-input-size"
                                    type="datetime-local"
                                    id="date"
                                    name="date"
                                    value={this.state.date}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group create-jam-input-size">
                                <label htmlFor="location">Location:</label>
                                <input
                                    className="form-control create-jam-input-width"
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <br/><br/>
                        <div className="create-instruments-wrapper">
                            <h4 className="text-center create-jam-section-title">Instruments <i className="fas fa-drum"></i></h4>
                            <hr/>
                            {this.state.instruments.map((instrument, idx) => (
                                <div className="form-group create-jam-input-size" key={`${idx}`}>
                                    <InstrumentInput 
                                        instrument={instrument} 
                                        nameChangeHandler={this.handleInstrumentNameChange(idx)}
                                        quantityChangeHandler={this.handleInstrumentQuantityChange(idx)} 
                                        removeHandler={this.handleRemoveInstrument(idx)}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={this.handleAddInstrument} className="btn btn-secondary btn-sm add-buttons">Add instrument</button>
                        </div>
                        <br/><br/>
                        <div className="create-genres-wrapper">
                            <h4 className="text-center create-jam-section-title">Genres <i className="fas fa-music"></i></h4>
                            <hr/>
                            {this.state.genres.map((genre, idx) => (
                                <div className="form-group create-jam-input-size" key={`${idx}`}>
                                <GenreInput
                                    genre={genre} 
                                    nameChangeHandler={this.handleGenreNameChange(idx)}
                                    removeHandler={this.handleRemoveGenre(idx)}
                                />
                                </div>
                            ))}
                            <button type="button" onClick={this.handleAddGenre} className="btn btn-secondary btn-sm add-buttons">Add genre</button>
                        </div>
                        <br/><br/>
                        <div className="text-center">
                        <button className="btn btn-primary btn-lg create-jam-button" onClick={this.handleFormSubmit}>Create Jam</button>
                        </div>
                    </form>
                    {this.state.jamCreated && <Redirect to={`/jam/${this.state.createdJamId}`} />}
                </div>
                <Footer />
            </div>
        )
    }
}

export default CreateJam;