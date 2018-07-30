import React, { Component } from "react";
import "./JamCard.css";
import md5 from "js-md5";
import moment from "moment";
import instrumentList from "../../utils/instruments.json";
import { Link } from "react-router-dom";
import {Collapse} from 'react-collapse';

class JamCard extends Component {
    state = {
        seeMore: false
    }

    getProfilePic = (email)=>{
        // console.log(email.trim())
        const gravatarHash = md5(email.trim().toLowerCase());
        // console.log(gravatarHash)
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`
    }

    getInstrumentIcon = (instrument) =>{
        let imgSrc = "/instrument_icons/no-waiting.png"
        for(let i=0; i<instrumentList.length; i++){
            if(instrumentList[i].name === instrument.name){
                console.log("match")
                imgSrc = instrumentList[i].icon
            }
        }
        console.log(imgSrc)
        return <img className="instrument-jam-card-pic px-1" src={imgSrc} alt="instrument"/>
    }

    toggleCollapse = ()=>{
        this.setState({
            seeMore: !this.state.seeMore
        })
    }

    render() {
        return (
            <div className={this.props.classes}>
                <div className="card jam-card">
                    <h5 className="card-header text-center py-2">{this.props.jamName}</h5>
                    <div className="card-body p-2" >
                        <div className="row no-gutters mb-3">
                            <div className="col-4 right-border">
                                <h6 className="jam-card-subheadings">Created By:</h6>
                                <div className="row no-gutters">
                                    <img className="user-mini-pic col-3 mx-0 px-0" src={this.getProfilePic(this.props.creator.email)} alt="Gravatar" />
                                    <div className="col-6">{this.props.creator.name}</div>
                                </div>
                            </div>
                            <div className="col-4 right-border">
                                <h6 className="jam-card-subheadings">When:</h6>
                                <div className="row no-gutters">

                                    <div className=" mb-0  row no-gutters">{moment(this.props.jamDate).format("MMMM Do YYYY")}</div>
                                    <div className=" row no-gutters">{moment(this.props.jamDate).format("h:mm a")}</div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h6 className="jam-card-subheadings">Where:</h6>
                                <div className="row no-gutters">
                                    <p className="card-text mb-0">{this.props.location.address}</p>
                                </div>
                            </div>
                        </div>
                        
                        <Collapse isOpened={this.state.seeMore} springConfig={{stiffness: 100, damping: 20}}>               
                        <div className="row no-gutters">
                            <h6 className="jam-card-subheadings">Jam Description:</h6>
                        </div>
                        <div className="row no-gutters mb-3">
                            <p className="card-text">{this.props.description}</p>
                        </div>
                        <div className="row no-gutters">
                            <h6 className="jam-card-subheadings">Instruments:</h6>
                        </div>
                        <div className="row no-gutters mb-3">
                            {this.props.instruments.map((instrument,idx) => (
                                <div className="jam-card-instrument pr-2">
                                    {this.getInstrumentIcon(instrument)}
                                    <span>{instrument.name}</span>

                                </div>
                                )
                            )}
                        </div>
                        
                        <div className="row no-gutters">
                            <h6 className="jam-card-subheadings">Genres:</h6>
                        </div> 
                        <div className="row no-gutters mb-3">
                            {this.props.genres.map((genre,idx) => (
                                <div className="col-4">{genre}</div>
                                )
                            )}
                        </div>
                              
                        </Collapse>

                        <button
                            className="btn btn-outline-secondary btn-sm btn-block toggle-collapse-button mb-2" 
                            onClick={this.toggleCollapse}
                        >
                            {this.state.seeMore? "Less Info" : "More Info"} 
                        </button> 
                        
                        

                        {this.props.unrequested && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary btn-sm mx-auto">Join Jam</button>}
                        {this.props.memberjam && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary btn-sm mx-auto">See Jam</button>}
                        {this.props.seeJam && <Link to={{
                                                    pathname: ('/jam/'+this.props.jamId),
                                                    state: {jamId: this.props.jamId}
                                                }}
                                                className="admin-jam-see-jam-button mx-auto"
                                            >
                                                <button onClick={() => this.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary btn-sm mx-auto">
                                                    See Jam
                                                </button>
                                            </Link>}
                    </div>
                </div>
            </div>
        )
    }

    
}

export default JamCard;