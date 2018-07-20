import React, { Component } from "react";

class GenreInput extends Component {

    render() {
        return (
            <div className="genre" >
                <select
                    value={this.props.genre}
                    onChange={this.props.nameChangeHandler}
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
                <button type="button" onClick={this.props.removeHandler} className="small">✖</button>
            </div>
        )
    }
    
}

export default GenreInput;