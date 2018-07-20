import React, { Component } from "react";

class InstrumentInput extends Component {

    render() {
        return (
            <div className="instrument" >
                Instrument
                <select
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
                    type="number"
                    placeholder="#"
                    min="1" 
                    max="10" 
                    onChange={this.props.quantityChangeHandler}
                />
                <button type="button" onClick={this.props.removeHandler} className="small">-</button>
            </div>
        )
    }

    
}

export default InstrumentInput;