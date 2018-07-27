import React, { Component } from "react";
import "./Jam.css";
import md5 from "js-md5";
import api from "../../utils/api";
import Footer from "../../components/Footer";

class Jam extends Component {
    state = {
        jamName:"",
        jamCreator:"",
        jamDate:"",
        members: ""
    }

    componentDidMount() {
        this.getJam()
    }

    getJam = () => {
        api.getOneJamById(this.props.jamId)
            .then(dbJam => {
                console.log(dbJam.data)
                this.setState({
                    jamName: dbJam.data.name,
                    jamDate: dbJam.data.date,
                    jamCreator: dbJam.data.admin.name,
                    members: dbJam.data.members
                })

            })
            .catch(err=>console.log(err))
    }

    getProfilePic = (email)=>{
        // console.log(email.trim())
        const gravatarHash = md5(email.trim().toLowerCase());
        // console.log(gravatarHash)
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`
    }
    getInstrumentIcon = (instruments) =>{
        // return "/instrument_icons/guitar.png"
        console.log(instruments)
        let imgSrc = ""
        if(instruments.length>0) {
            return (instruments.map((instrument,idx) => {
                switch(instrument.name){
                    case "leadGuitar":
                        imgSrc = "/instrument_icons/guitar-black-shape.png"
                        break;
                    case "rhythmGuitar":
                        imgSrc = "/instrument_icons/guitar.png"
                        break;
                    case "bass":
                        imgSrc = "/instrument_icons/bass.png"
                        break;
                    case "keys":
                        imgSrc = "/instrument_icons/piano.png"
                        break;
                    case "drums":
                        imgSrc = "/instrument_icons/drummer-set.png"
                        break;
                    case "percussion":
                        imgSrc = "/instrument_icons/drummer-set.png"
                        break;
                    case "vocals":
                        imgSrc = "/instrument_icons/voice.png"
                        break;
                    default:
                        imgSrc = "/instrument_icons/no-waiting.png"
                        break;
                    }
                    console.log(imgSrc)
                return <img key={idx} className="instrument-mini-pic px-1" src={imgSrc} alt="instrument"/>
            })
        )
            
        }else{
            return <img className="instrument-mini-pic " src="/instrument_icons/no-waiting.png" alt="instrument"/>
        }

    }


    render() {
        return (
            <div className="jam-bg">
                <div className="jam-page-content container-fluid">
                    <br />
                    <div className="d-md-flex justify-content-around">
                        <div className="jam-section-wrapper d-block col-md-6">
                            <div className="next-jam-section">
                                <p className="text-center next-jam-title-text">{this.state.jamName}</p>
                                <hr className="jam-page-separator"/>
                                <div className="next-jam-wrapper d-flex container-fluid">
                                    <div className="next-jam-info col-12">
                                        <p>Jam Name: {this.state.jamName}</p>
                                        <p>Creator: {this.state.jamCreator}</p>
                                        <p>Date: {this.state.jamDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="most-recent-jam-section">
                                <p className="text-center recent-jam-title-text">Members</p>
                                <hr className="jam-page-separator" />
                                <div className="most-recent-jam-wrapper d-flex container-fluid">
                                    <div className="most-recent-jam-info col-12">
                                        {this.state.members ?
                                            this.state.members.map((member,idx)=>(
                                            <div className="row" key={idx}>
                                                <img className="user-mini-pic col-3 mx-0 px-0" src={this.getProfilePic(member.email)} alt="Gravatar" />
                                                <div className="col-6" key={idx}>{member.name}</div>
                                                <div className="jampage-instrument-wrapper col-3">
                                                    {this.getInstrumentIcon(member.instruments)}
                                                </div>
                                        
                                            </div>
                                            ))

                                            : <p>Loading...</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-simple-profile-section col-md-6">
                            <p>Posts</p>
                        </div>
                    </div>
                </div>
            
                <Footer />
            </div>
        )
    }
}

export default Jam;