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
                    <option value="leadGuitar">Lead Guitar</option>
                    <option value="rhythmGuitar">Rhythm Guitar</option>
                    <option value="bass">Bass</option>
                    <option value="keys">Keys</option>
                    <option value="drums">Drums</option>
                    <option value="percussion">Percussion</option>
                    <option value="vocals">Vocals</option>
                </select>

                {this.props.quantityChangeHandler && (
                    <React.Fragment>
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
                    </React.Fragment>
                )}

                {this.props.skillChangeHandler && (
                    <React.Fragment>
                        {!this.props.disabled && <button type="button" onClick={this.props.removeHandler} className="btn btn-sm btn-outline-secondary instrument-button-width">✖</button>}
                        <div className="instrument-skill-change-section d-flex justify-content-around">
                            <div className="skill-change-input-width">
                                <input disabled={this.props.disabled} type="radio" name={`instrument${this.props.radioIndex}`} value="1" onClick={this.props.skillChangeHandler} checked={parseInt(this.props.instrument.skill, 16) === 1} />
                                <label>Beginner</label>
                            </div>
                            <div className="skill-change-input-width">
                                <input disabled={this.props.disabled} type="radio" name={`instrument${this.props.radioIndex}`} value="2" onClick={this.props.skillChangeHandler} checked={parseInt(this.props.instrument.skill, 16) === 2} />
                                <label>Intermediate</label>
                            </div>
                            <div className="skill-change-input-width">
                                <input disabled={this.props.disabled} type="radio" name={`instrument${this.props.radioIndex}`} value="3" onClick={this.props.skillChangeHandler} checked={parseInt(this.props.instrument.skill, 16) === 3} />
                                <label>Expert</label>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }

    
}

export default InstrumentInput;