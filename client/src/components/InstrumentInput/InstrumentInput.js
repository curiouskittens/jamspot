import React, { Component } from "react";
import "./InstrumentInput.css";

class InstrumentInput extends Component {

    render() {
        return (
            <div className="instrument">
                <select
                    className="form-control instrument-select-width create-jam-input-size"
                    value={this.props.instrument.name}
                    onChange={this.props.nameChangeHandler}
                >
                    <option defaultValue disabled value=""> -- select an instrument -- </option>
                    <option value="leadGuitar">Lead Guitar</option>
                    <option value="rhythmGuitar">Rhythm Guitar</option>
                    <option value="bass">Bass</option>
                    <option value="keys">Keys</option>
                    <option value="drums">Drums</option>
                    <option value="percussion">Percussion</option>
                    <option value="vocals">Vocals</option>
                </select>
                <input
                    className="form-control instrument-input-width"
                    type="number"
                    placeholder="#"
                    min="1" 
                    max="10"
                    onKeyPress={this.handleKeyPress}
                    value={this.props.instrument.quantity}
                    onChange={this.props.quantityChangeHandler}
                    required
                />
                <button type="button" onClick={this.props.removeHandler} className="btn btn-sm btn-outline-secondary instrument-button-width">✖</button>
            </div>
        )
    }

    
}

export default InstrumentInput;