import React, { Component } from "react";
import "./GenreInput.css";

class GenreInput extends Component {
  render() {
    return (
      <div className="genre">
        <select
          className="form-control genre-select-width create-jam-input-size"
          value={this.props.genre}
          onChange={this.props.nameChangeHandler}
          disabled={this.props.disabled}
        >
          <option defaultValue disabled value="">
            {" "}
            -- select a genre --{" "}
          </option>
          {this.props.genre && (
            <option value={this.props.genre}>{this.props.genre}</option>
          )}
          {this.props.genreOptions &&
            this.props.genreOptions.map((genre, idx) => (
              <option key={idx} value={genre.value}>
                {genre.name}
              </option>
            ))}
        </select>
        {!this.props.disabled && (
          <button
            type="button"
            onClick={this.props.removeHandler}
            className="btn btn-sm btn-outline-secondary genre-button-width"
          >
            ✖
          </button>
        )}
      </div>
    );
  }
}

export default GenreInput;
