import React, { Component } from "react";
import "./GenreInput.css";

class GenreInput extends Component {

    render() {
        return (
            <div className="genre" >
                <select
                    className="form-control genre-select-width create-jam-input-size"
                    value={this.props.genre}
                    onChange={this.props.nameChangeHandler}
                    disabled={this.props.disabled}
                >
                    <option defaultValue disabled value=""> -- select a genre -- </option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="rock">Rock</option>
                    <option value="bluegrass">Bluegrass</option>
                    <option value="country">Country</option>
                    <option value="folk">Folk</option>
                    <option value="indie">Indie</option>
                    <option value="punk">Punk</option>
                    <option value="alternative">Alternative</option>
                    <option value="classical">Classical</option>
                    <option value="jazz">Jazz</option>
                    <option value="randb">R&B</option>
                    <option value="blues">Blues</option>
                    <option value="electronic">Electronic</option>
                </select>
                {!this.props.disabled && <button type="button" onClick={this.props.removeHandler} className="btn btn-sm btn-outline-secondary genre-button-width">✖</button>}
            </div>
        )
    }
    
}

export default GenreInput;