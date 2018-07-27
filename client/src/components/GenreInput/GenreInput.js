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
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Rock">Rock</option>
                    <option value="Bluegrass">Bluegrass</option>
                    <option value="Country">Country</option>
                    <option value="Folk">Folk</option>
                    <option value="Indie">Indie</option>
                    <option value="Punk">Punk</option>
                    <option value="Alternative">Alternative</option>
                    <option value="Classical">Classical</option>
                    <option value="Jazz">Jazz</option>
                    <option value="R&B">R&B</option>
                    <option value="Blues">Blues</option>
                    <option value="Electronic">Electronic</option>
                </select>
                {!this.props.disabled && <button type="button" onClick={this.props.removeHandler} className="btn btn-sm btn-outline-secondary genre-button-width">✖</button>}
            </div>
        )
    }
    
}

export default GenreInput;