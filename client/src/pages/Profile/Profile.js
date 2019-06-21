import React, { Component } from "react";
import api from "../../utils/api";
import md5 from "js-md5";
import moment from "moment";
import "./Profile.css";
import Footer from "../../components/Footer";
import InstrumentInput from "../../components/InstrumentInput";
import GenreInput from "../../components/GenreInput";
import sweetAlert from "../../utils/sweetAlert";
import TextareaAutosize from "react-autosize-textarea";
import instrumentList from "../../utils/instruments.json";
import genreList from "../../utils/genres.json";

class Profile extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    image: "",
    memberSince: "",
    bio: "",
    instruments: [{ name: "", skill: "" }],
    genres: [""],
    soundcloud: "",
    bioDisabled: true,
    instrumentsDisabled: true,
    genresDisabled: true,
    soundcloudDisabled: true,
    defaultInstrumentSkillBar:
      "instrument-skill-change-section d-flex justify-content-around skillbar-background",
    instrumentOptions: instrumentList.slice(),
    genreOptions: genreList.slice()
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    api
      .getProfile(sessionStorage.getItem("userId"))
      .then(profile => {
        const gravatarHash = md5(profile.data.email.trim().toLowerCase());
        this.setState({
          name: profile.data.name,
          username: profile.data.username,
          image: `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=300`,
          memberSince: profile.data.dateCreated
        });

        if (profile.data.bio) this.setState({ bio: profile.data.bio });
        if (profile.data.instruments[0].name !== undefined)
          this.setState({ instruments: profile.data.instruments });
        if (profile.data.genres[0])
          this.setState({ genres: profile.data.genres });
        if (profile.data.soundcloud)
          this.setState({ soundcloud: profile.data.soundcloud });
      })
      .catch(err => console.log(err));
  };

  toggleEdit = event => {
    const toggler = event.target.id;
    const toggleComponent = toggler.split("D")[0];

    const togglerType = event.target.nodeName.toLowerCase();
    const togglerText = event.target.innerHTML;
    if (toggler === "instrumentsDisabled") {
      this.setState({
        defaultInstrumentSkillBar:
          "instrument-skill-change-section d-flex justify-content-around"
      });
    }

    if (togglerType === "button" && togglerText === "Save") {
      if (toggleComponent === "instruments") {
        const blankInstruments = this.state.instruments.filter(
          instrument => !instrument.name
        );
        const blankInstrumentsSkill = this.state.instruments.filter(
          instrument => !instrument.skill
        );

        if (blankInstruments.length) {
          return sweetAlert(
            "error",
            "warning-text",
            "Please delete or fill out the blank instrument."
          );
        } else if (blankInstrumentsSkill.length) {
          return sweetAlert(
            "error",
            "warning-text",
            "Please enter your skill level for each instrument."
          );
        }
        this.setState({
          defaultInstrumentSkillBar:
            "instrument-skill-change-section d-flex justify-content-around skillbar-background"
        });
      } else if (toggleComponent === "genres") {
        const blankGenres = this.state.genres.filter(val => val === "");

        if (blankGenres.length) {
          return sweetAlert(
            "error",
            "warning-text",
            "Please delete or fill out the blank genre."
          );
        }
      }

      this.saveProfile(toggleComponent);
    } else if (togglerType === "button" && togglerText === "forceSave") {
      this.saveProfile(toggleComponent);
    }

    this.setState(
      prevState => ({ [toggler]: !prevState[toggler] }),
      () => {
        if (!this.state[toggler]) {
          this.focusInput(toggleComponent);
        }
      }
    );
  };

  focusInput = inputId => {
    console.log(inputId);
    document.getElementById(inputId).focus();
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Instrument Input Handlers
  updateInstrumentOptions = currentInstrumentsInState => {
    const newInstrumentOptions = instrumentList.filter(option => {
      for (let i = 0; i < currentInstrumentsInState.length; i++) {
        if (currentInstrumentsInState[i].name === option.name) {
          return false;
        }
      }
      return true;
    });
    return newInstrumentOptions;
  };

  handleInstrumentNameChange = idx => evt => {
    const newInstruments = this.state.instruments.map((instrument, sidx) => {
      if (idx !== sidx) return instrument;
      return { ...instrument, name: evt.target.value };
    });

    const newInstrumentOptions = this.updateInstrumentOptions(newInstruments);
    this.setState({
      instruments: newInstruments,
      instrumentOptions: newInstrumentOptions
    });
  };

  handleInstrumentSkillChange = idx => evt => {
    const newInstruments = this.state.instruments.map((instrument, sidx) => {
      if (idx !== sidx) return instrument;
      return { ...instrument, skill: evt.target.value };
    });

    this.setState({ instruments: newInstruments });
  };

  handleAddInstrument = () => {
    let instrumentSelected = true;
    this.state.instruments.forEach(instrument => {
      if (!instrument.name) {
        sweetAlert("error", "warning-text", "Please select an instrument.");
        instrumentSelected = false;
        return;
      } else if (!instrument.skill) {
        sweetAlert("error", "warning-text", "Please specify your skill level.");
        instrumentSelected = false;
        return;
      }
    });
    if (instrumentSelected) {
      const newInstrumentOptions = this.updateInstrumentOptions(
        this.state.instruments
      );
      this.setState({
        instruments: this.state.instruments.concat([{ name: "", skill: "" }]),
        instrumentOptions: newInstrumentOptions
      });
    }
  };

  handleRemoveInstrument = idx => () => {
    if (this.state.instruments.length > 1) {
      const newInstruments = this.state.instruments.filter(
        (s, sidx) => idx !== sidx
      );
      const newInstrumentOptions = this.updateInstrumentOptions(newInstruments);
      this.setState({
        instruments: newInstruments,
        instrumentOptions: newInstrumentOptions
      });
    } else {
      this.setState({ instruments: [{ name: "", skill: "" }] }, () => {
        this.toggleEdit({
          target: {
            id: "instrumentsDisabled",
            nodeName: "button",
            innerHTML: "forceSave"
          }
        });
      });
    }
  };

  // Genre Input Handlers
  updateGenreOptions = currentGenresInState => {
    const newGenreOptions = genreList.filter(option => {
      for (let i = 0; i < currentGenresInState.length; i++) {
        if (currentGenresInState[i] === option.name) {
          return false;
        }
      }
      return true;
    });
    return newGenreOptions;
  };

  handleGenreNameChange = idx => evt => {
    const newGenres = this.state.genres.map((genre, sidx) => {
      if (idx !== sidx) return genre;
      return evt.target.value;
    });
    const newGenreOptions = this.updateGenreOptions(newGenres);
    this.setState({ genres: newGenres, genreOptions: newGenreOptions });
  };

  handleAddGenre = () => {
    let genreSelected = true;
    this.state.genres.forEach(genre => {
      if (!genre) {
        sweetAlert("error", "warning-text", "Please select a genre.");
        genreSelected = false;
        return;
      }
    });
    if (genreSelected) {
      const newGenreOptions = this.updateGenreOptions(this.state.genres);
      this.setState({
        genres: this.state.genres.concat([""]),
        genreOptions: newGenreOptions
      });
    }
  };

  handleRemoveGenre = idx => () => {
    if (this.state.genres.length > 1) {
      const newGenres = this.state.genres.filter((s, sidx) => idx !== sidx);
      const newGenreOptions = this.updateGenreOptions(newGenres);
      this.setState({ genres: newGenres, genreOptions: newGenreOptions });
    } else {
      this.setState({ genres: [""] }, () => {
        this.toggleEdit({
          target: {
            id: "genresDisabled",
            nodeName: "button",
            innerHTML: "forceSave"
          }
        });
      });
    }
  };

  saveProfile = updatedComponent => {
    api
      .updateProfile(sessionStorage.getItem("userId"), {
        [updatedComponent]: this.state[updatedComponent]
      })
      .then(() => this.getProfile())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="profile-page-bg">
        <div className="profile-page-content container-fluid">
          <div className="container d-md-flex justify-content-around profile-sections-wrapper">
            <div className="col-md-4 profile-page-photo-section">
              <a
                href="https://en.gravatar.com/"
                target="react/jsx-no-target-blank"
              >
                <img
                  src={this.state.image}
                  className="profile-photo-style"
                  alt="Gravatar"
                />
              </a>
              <br />
              <br />
              <p className="profile-photo-section-name">{this.state.name}</p>
              <p className="profile-photo-section-username">
                @{this.state.username}
              </p>
              <p className="profile-photo-section-since">
                Member since{" "}
                {moment(this.state.memberSince).format("MMMM D, YYYY")}
              </p>
              <div className="profile-instrument-section">
                <p className="profile-info-sub-title">
                  Soundcloud{" "}
                  {this.state.soundcloudDisabled ? (
                    <i
                      className="fas fa-edit"
                      id="soundcloudDisabled"
                      onClick={this.toggleEdit}
                    />
                  ) : (
                    <button
                      id="soundcloudDisabled"
                      className="btn btn-primary btn-responsive"
                      onClick={this.toggleEdit}
                    >
                      Save
                    </button>
                  )}
                </p>
                <hr className="profile-page-separator" />
                {!this.state.soundcloud && (
                  <p className="profile-no-input-text">
                    Add your username so others can hear your music!
                  </p>
                )}
                {!this.state.soundcloudDisabled && (
                  <input
                    id="soundcloud"
                    name="soundcloud"
                    value={this.state.soundcloud}
                    disabled={this.state.soundcloudDisabled}
                    onChange={this.handleInputChange}
                    className="form-control"
                  />
                )}
                {this.state.soundcloud && this.state.soundcloudDisabled && (
                  <iframe
                    title="soundcloud"
                    width="100%"
                    height="300"
                    scrolling="no"
                    frameBorder="no"
                    src={`https://w.soundcloud.com/player/?url=https://soundcloud.com/${
                      this.state.soundcloud
                    }`}
                  />
                )}
              </div>
            </div>

            <div className="col-md-7 profile-page-info-section">
              <p className="text-center profile-info-title">
                Your Profile <i className="fas fa-user" />
              </p>
              <div className="profile-bio-section">
                <p className="profile-info-sub-title">
                  Bio{" "}
                  {this.state.bioDisabled ? (
                    <i
                      className="fas fa-edit"
                      id="bioDisabled"
                      onClick={this.toggleEdit}
                    />
                  ) : (
                    <button
                      id="bioDisabled"
                      className="btn btn-primary btn-responsive"
                      onClick={this.toggleEdit}
                    >
                      Save
                    </button>
                  )}
                </p>
                <hr className="profile-page-separator" />
                {!this.state.bio && (
                  <p className="profile-no-input-text">
                    Hmm, looks like there's nothing here. Why don't you tell us
                    a bit about yourself?
                  </p>
                )}
                {(this.state.bio || !this.state.bioDisabled) && (
                  <TextareaAutosize
                    id="bio"
                    name="bio"
                    rows={1}
                    value={this.state.bio}
                    disabled={this.state.bioDisabled}
                    onChange={this.handleInputChange}
                    className="form-control bio-textarea"
                  />
                )}
              </div>

              <div className="profile-instrument-section">
                <p className="profile-info-sub-title">
                  Instruments{" "}
                  {this.state.instrumentsDisabled ? (
                    <i
                      className="fas fa-edit"
                      id="instrumentsDisabled"
                      onClick={this.toggleEdit}
                    />
                  ) : (
                    <button
                      id="instrumentsDisabled"
                      className="btn btn-primary btn-responsive"
                      onClick={this.toggleEdit}
                    >
                      Save
                    </button>
                  )}
                </p>
                <hr className="profile-page-separator" />
                {/* {console.log(this.state.instruments)} */}
                {this.state.instruments[0].name === "" && (
                  <p className="profile-no-input-text">
                    Hmm, looks like there's nothing here. Why don't you tell us
                    what instruments you play?
                  </p>
                )}
                {(this.state.instruments[0].name !== "" ||
                  !this.state.instrumentsDisabled) &&
                  this.state.instruments.map((instrument, idx) => (
                    <div key={`${idx}`} id="instruments">
                      <InstrumentInput
                        disabled={this.state.instrumentsDisabled}
                        radioIndex={idx}
                        instrument={instrument}
                        nameChangeHandler={this.handleInstrumentNameChange(idx)}
                        skillChangeHandler={this.handleInstrumentSkillChange(
                          idx
                        )}
                        removeHandler={this.handleRemoveInstrument(idx)}
                        instrumentBar={this.state.defaultInstrumentSkillBar}
                        instrumentOptions={this.state.instrumentOptions}
                      />
                    </div>
                  ))}
                {!this.state.instrumentsDisabled && (
                  <button
                    disabled={this.state.instrumentsDisabled}
                    type="button"
                    onClick={this.handleAddInstrument}
                    className="btn btn-secondary btn-sm add-buttons"
                    style={{ marginTop: "3vh" }}
                  >
                    Add instrument
                  </button>
                )}
              </div>

              <div className="profile-genre-section">
                <p className="profile-info-sub-title">
                  Genres{" "}
                  {this.state.genresDisabled ? (
                    <i
                      className="fas fa-edit"
                      id="genresDisabled"
                      onClick={this.toggleEdit}
                    />
                  ) : (
                    <button
                      id="genresDisabled"
                      className="btn btn-primary btn-responsive"
                      onClick={this.toggleEdit}
                    >
                      Save
                    </button>
                  )}
                </p>
                <hr className="profile-page-separator" />
                {!this.state.genres[0] && (
                  <p className="profile-no-input-text">
                    Hmm, looks like there's nothing here. Why don't you tell us
                    what genres you play?
                  </p>
                )}
                {(this.state.genres[0] || !this.state.genresDisabled) &&
                  this.state.genres.map((genre, idx) => (
                    <div key={`${idx}`} id="genres">
                      <GenreInput
                        disabled={this.state.genresDisabled}
                        genre={genre}
                        nameChangeHandler={this.handleGenreNameChange(idx)}
                        removeHandler={this.handleRemoveGenre(idx)}
                        genreOptions={this.state.genreOptions}
                      />
                    </div>
                  ))}
                {!this.state.genresDisabled && (
                  <button
                    type="button"
                    onClick={this.handleAddGenre}
                    className="btn btn-secondary btn-sm add-buttons"
                    style={{ marginTop: "3vh" }}
                  >
                    Add genre
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
