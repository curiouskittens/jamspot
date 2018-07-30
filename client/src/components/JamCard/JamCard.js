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
                    <h5 className="card-header text-center py-2 jamcard-title-text">{this.props.jamName} {this.props.adminmarker && <i className="fas fa-star"></i>}</h5>
                    <div className="card-body p-2" >
                        <div className="row no-gutters mb-3">
                            <div className="col-4 right-border">
                                <h6 className="jam-card-subheadings text-left jamcard-info-text">Created by:</h6>
                                <div className="row no-gutters">
                                    <img className="user-mini-pic col-md-3 mx-0 px-0 text-left" src={this.getProfilePic(this.props.creator.email)} alt="Gravatar" />
                                    <p className="col-md-6 text-left jamcard-info-text">{this.props.creator.name}</p>
                                </div>
                            </div>
                            <div className="col-4 right-border">
                                <h6 className="jam-card-subheadings text-center jamcard-info-text">When:</h6>
                                <p className=" mb-0 text-center jamcard-info-text">{moment(this.props.jamDate).format("MMMM Do YYYY")}</p>
                                <p className="text-center jamcard-info-text">{moment(this.props.jamDate).format("h:mm a")}</p>
                            </div>
                            <div className="col-4">
                                <h6 className="jam-card-subheadings text-right jamcard-info-text">Where:</h6>
                                <p className="card-text mb-0 text-right jamcard-info-text">{this.props.location.address}</p>
                            </div>
                        </div>
                        
                        <Collapse isOpened={this.state.seeMore} springConfig={{stiffness: 100, damping: 20}}>               
                        <div className="row no-gutters">
                            <h6 className="jam-card-subheadings jamcard-info-text">Jam Description:</h6>
                        </div>
                        <div className="row no-gutters mb-3 jamcard-info-text">
                            <p className="card-text">{this.props.description}</p>
                        </div>
                        <div className="row no-gutters">
                            <h6 className="jam-card-subheadings jamcard-info-text">Instruments:</h6>
                        </div>
                        <div className="row no-gutters mb-3 jamcard-info-text">
                            {this.props.instruments.map((instrument,idx) => (
                                <div className="jam-card-instrument pr-2" key={idx}>
                                    {this.getInstrumentIcon(instrument)}
                                    <span>{instrument.name}</span>
                                </div>
                                )
                            )}
                        </div>
                        
                        <div className="row no-gutters">
                            <h6 className="jam-card-subheadings jamcard-info-text">Genres:</h6>
                        </div> 
                        <div className="row no-gutters mb-3 jamcard-info-text">
                            {this.props.genres.map((genre,idx) => (
                                <div className="col-4" key={idx}>{genre}</div>
                                )
                            )}
                        </div>
                              
                        </Collapse>

                        <button
                            className="btn btn-outline-secondary btn-sm btn-block toggle-collapse-button mb-2 jamcard-info-text" 
                            onClick={this.toggleCollapse}
                        >
                            {this.state.seeMore? "Less Info" : "More Info"} 
                        </button> 
                        
                        
                        <div className="row"> 
                        {this.props.unrequested && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary btn-sm mx-auto jamcard-info-text text-center">Join Jam</button>}
                        {this.props.memberjam && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary btn-sm mx-auto jamcard-info-text text-center">See Jam</button>}
                        {this.props.seeJam && <Link to={{
                                                    pathname: ('/jam/'+this.props.jamId),
                                                    state: {jamId: this.props.jamId}
                                                }}
                                                className="admin-jam-see-jam-button mx-auto jamcard-info-text text-center"
                                            >
                            <button onClick={() => this.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary btn-sm mx-auto text-center">
                                                    See Jam
                                                </button>
                                            </Link>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default JamCard;