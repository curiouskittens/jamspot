import React, { Component } from "react";
import "./JamCard.css";
import md5 from "js-md5";
import moment from "moment";

class JamCard extends Component {
    getProfilePic = (email)=>{
        // console.log(email.trim())
        const gravatarHash = md5(email.trim().toLowerCase());
        // console.log(gravatarHash)
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`
    }

    render() {
        return (
            <div className="col-md-12 jam-card-wrapper">
                <div className="card jam-card">
                    <h5 className="card-header text-center">{this.props.jamName}</h5>
                    <div className="card-body" >
                        <h6 className="jam-card-subheadings">Created By:</h6>
                        <div className="row px-3">
                            <img className="user-mini-pic col-3 mx-0 px-0" src={this.getProfilePic(this.props.creator.email)} alt="Gravatar" />
                            <div className="col-6">{this.props.creator.name}</div>
                        </div>
                        
                        <h6 className="jam-card-subheadings mt-3">Jam Description:</h6>
                        <p className="card-text">{this.props.description}</p>

                        <p>
                            <span className="jam-card-subheadings mt-3">Date:  </span>
                            <span className="card-text">{moment(this.props.jamDate).format("MMMM D, YYYY")}</span>
                        </p>
                        <p>
                            <span className="jam-card-subheadings mt-3">Time:  </span>
                            <span className="card-text">{moment(this.props.jamDate).format("h:mm a")}</span>
                        </p>

                        <h6 className="jam-card-subheadings">Instruments:</h6>
                        <div className="row px-3">
                            {/* <img className="user-mini-pic col-3 mx-0 px-0" src={this.getProfilePic(this.props.creator.email)} alt="Gravatar" /> */}
                            {this.props.instruments.map((instrument,idx) => (
                                <div className="col-4">{instrument.name}</div>
                                )
                            )}
                        </div>

                        <h6 className="jam-card-subheadings">Genres:</h6>
                        <div className="row px-3">
                            {/* <img className="user-mini-pic col-3 mx-0 px-0" src={this.getProfilePic(this.props.creator.email)} alt="Gravatar" /> */}
                            {this.props.genres.map((genre,idx) => (
                                <div className="col-4">{genre}</div>
                                )
                            )}
                        </div>
                        

                        {this.props.unrequested && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary">Join Jam</button>}
                        {this.props.memberjam && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary">See Jam</button>}
                    </div>
                </div>
            </div>
        )
    }

    
}

export default JamCard;