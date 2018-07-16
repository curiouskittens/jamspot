import React, { Component } from "react";
import api from "../../utils/api";

class CreateJam extends Component {
    state = {
        jamName: "",
        description: "",
        date: "",
        location: "",
        instruments:[{ name: '', quantity: '' }]
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    handleInstrumentChange = event => {
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

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        const newJam = {
            name: this.state.jamName,
            description: this.state.description,
            date: this.state.date,
            location: this.state.location
        }
        // console.log(newJam)


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
            <form id="jamForm" action="localhost:3001/api/jams/test" method="post">
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
                    <div className="instrument">
                    <select
                        placeholder={`instrument #${idx + 1} name`}
                        value={instrument.name}
                        onChange={this.handleInstrumentNameChange(idx)}
                    >
                        <option value="leadGuitar">Lead Guitar</option>
                        <option value="rythmGuitar">Rythm Guitar</option>
                        <option value="bass">Bass</option>
                        <option value="keys">Keys</option>
                        <option value="drums">Drums</option>
                        <option value="percussion">Percussion</option>
                        <option value="vocals">Vocals</option>
                    </select>
                    <input 
                        type="number"
                        placeholder="#"
                        min="1" 
                        max="10" 
                        onChange={this.handleInstrumentQuantityChange(idx)}
                    />
                    <button type="button" onClick={this.handleRemoveInstrument(idx)} className="small">-</button>
                    </div>
                ))}
                <button type="button" onClick={this.handleAddInstrument} className="small">Add instrument</button>

                <br/><br/>
                <button onClick={this.handleFormSubmit}>Create Jam</button>
            </form>
        )
    }
}

export default CreateJam;