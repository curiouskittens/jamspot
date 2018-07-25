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
                    disabled={this.props.disabled}
                >
                    <option defaultValue disabled value=""> -- select an instrument -- </option>
                    <option value="Lead Guitar">Lead Guitar</option>
                    <option value="Rhythm Guitar">Rhythm Guitar</option>
                    <option value="Bass">Bass</option>
                    <option value="Keys">Keys</option>
                    <option value="Drums">Drums</option>
                    <option value="Percussion">Percussion</option>
                    <option value="Vocals">Vocals</option>
                </select>

                {this.props.quantityChangeHandler && (
                    <div>
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
                )}

                {this.props.skillChangeHandler && (
                    <div>
                        <input disabled={this.props.disabled} type="radio" name={`instrument${this.props.radioIndex}`} value="1" onClick={this.props.skillChangeHandler} checked={parseInt(this.props.instrument.skill, 16) === 1} />
                        <label>Beginner</label>
                    
                        <input disabled={this.props.disabled} type="radio" name={`instrument${this.props.radioIndex}`} value="2" onClick={this.props.skillChangeHandler} checked={parseInt(this.props.instrument.skill, 16) === 2} />
                        <label>Intermediate</label>
                    
                        <input disabled={this.props.disabled} type="radio" name={`instrument${this.props.radioIndex}`} value="3" onClick={this.props.skillChangeHandler} checked={parseInt(this.props.instrument.skill, 16) === 3} />
                        <label>Expert</label>

                        {!this.props.disabled && <button type="button" onClick={this.props.removeHandler} className="btn btn-sm btn-outline-secondary instrument-button-width">✖</button>}
                    </div>
                )}
            </div>
        )
    }

    
}

export default InstrumentInput;