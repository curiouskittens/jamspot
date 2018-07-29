import React, { Component } from "react";
import { Redirect } from "react-router";
import api from "../../utils/api";
import "./CreateJam.css";
import Footer from "../../components/Footer";
import InstrumentInput from "../../components/InstrumentInput"
import GenreInput from "../../components/GenreInput"
import sweetAlert from "../../utils/sweetAlert";
import instrumentList from "../../utils/instruments.json";
import genreList from "../../utils/genres.json";


class CreateJam extends Component {
    state = {
        jamName: "",
        description: "",
        date: "",
        location: "",
        instruments:[{ name: "", quantity: ""}],
        genres: [""],
        jamCreated: false,
        createdJamId: "",
        instrumentOptions: instrumentList.slice(),
        genreOptions: genreList.slice()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    // Instrument Input Handlers
    updateInstrumentOptions = (currentInstrumentsInState) => {
        const newInstrumentOptions = instrumentList.filter(option=>{
            for(let i=0; i< currentInstrumentsInState.length;i++){
                if (currentInstrumentsInState[i].name === option.name){
                    return false
                }
            }
            return true
        })
        return newInstrumentOptions
    }

    handleInstrumentNameChange = (idx) => (evt) => {
        const newInstruments = this.state.instruments.map((instrument, sidx) => {
          if (idx !== sidx) return instrument;
          return { ...instrument, name: evt.target.value };
        });

        const newInstrumentOptions = this.updateInstrumentOptions(newInstruments)
        this.setState({ instruments: newInstruments, instrumentOptions: newInstrumentOptions });
    }

    handleInstrumentQuantityChange = (idx) => (evt) => {
        const newInstruments = this.state.instruments.map((instrument, sidx) => {
          if (idx !== sidx) return instrument;
          return { ...instrument, quantity: evt.target.value };
        });
        
        this.setState({ instruments: newInstruments });
    }
    
    handleAddInstrument = () => {
        let instrumentSelected = true
        this.state.instruments.forEach((instrument)=>{
            if(!instrument.name){
                sweetAlert("error", "warning-text", "Please select an instrument.")
                instrumentSelected = false
                return
            }else if(!instrument.quantity){
                sweetAlert("error", "warning-text", "Please specify the number of players needed.")
                instrumentSelected = false
                return
            }
        })
        if(instrumentSelected){
            const newInstrumentOptions = this.updateInstrumentOptions(this.state.instruments)
            this.setState({ 
                instruments: this.state.instruments.concat([{ name: '', quantity: ''}]),
                instrumentOptions: newInstrumentOptions
             });
        }
    }
    
    handleRemoveInstrument = (idx) => () => {
        const newInstruments = this.state.instruments.filter((s, sidx) => idx !== sidx)
        const newInstrumentOptions = this.updateInstrumentOptions(newInstruments)
        this.setState({ instruments: newInstruments, instrumentOptions: newInstrumentOptions });
    }

    // Genre Input Handlers
    updateGenreOptions = (currentGenresInState) => {
        const newGenreOptions = genreList.filter(option=>{
            for(let i=0; i< currentGenresInState.length;i++){
                if (currentGenresInState[i] === option.name){
                    return false
                }
            }
            return true
        })
        return newGenreOptions
    }

    handleGenreNameChange = (idx) => (evt) => {
        const newGenres = this.state.genres.map((genre, sidx) => {
          if (idx !== sidx) return genre;
          return evt.target.value;
        });
        const newGenreOptions = this.updateGenreOptions(newGenres)
        this.setState({ genres: newGenres, genreOptions: newGenreOptions});
    }
    handleAddGenre = () => {
        let genreSelected = true
        this.state.genres.forEach((genre)=>{
            if(!genre){
                sweetAlert("error", "warning-text", "Please select a genre.")
                genreSelected = false
                return
            }
        })
        if(genreSelected){
            const newGenreOptions = this.updateGenreOptions(this.state.genres)
            this.setState({ genres: this.state.genres.concat([ "" ]), genreOptions: newGenreOptions });
        }
    }
    
    handleRemoveGenre = (idx) => () => {
        const newGenres = this.state.genres.filter((s, sidx) => idx !== sidx)
        const newGenreOptions = this.updateGenreOptions(newGenres)
        this.setState({ genres: newGenres, genreOptions: newGenreOptions});
    }

    // Form Submission
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
                location: { address: this.state.location },
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
                                        instrumentOptions={this.state.instrumentOptions}
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
                                    genreOptions={this.state.genreOptions}
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