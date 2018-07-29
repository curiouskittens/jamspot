import React, { Component } from "react";
import { Redirect } from "react-router";
import "./Jam.css";
import md5 from "js-md5";
import moment from "moment";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import TextareaAutosize from "react-autosize-textarea";
import sweetAlert from "../../utils/sweetAlert";
import NoMatch from "../NoMatch";
import Linkify from 'react-linkify';

class Jam extends Component {
    state = {
        jamName:"",
        jamCreator:"",
        jamDate:"",
        members: "",
        postInput: "",
        posts:[],
        isMember: true,
        jamFound: true
    }

    componentDidMount() {
        this.getJam()
    }

    getJam = () => {
        api.getOneJamById(this.props.jamId)
            .then(dbJam => {
                console.log(dbJam);
                if (dbJam.data.name === "CastError") {
                    this.setState({ jamFound: false });
                } else {
                    if (this.validateUser(dbJam.data.members)) {
                        this.setState({
                            jamName: dbJam.data.name,
                            jamDate: dbJam.data.date,
                            jamCreator: dbJam.data.admin.name,
                            members: dbJam.data.members,
                            posts: dbJam.data.posts
                        })
                    } else {
                        sweetAlert("error", "warning-text", "Sorry, you are not a member of that jam.")
                        this.setState({ isMember: false });
                    }
                }
            })
            .catch(err=>console.log(err))
    }

    validateUser = members => {
        const found = members.find(member => {
            if (member._id === sessionStorage.getItem("userId")) {
                return true;
            } else {
                return false;
            }
        });

        return found;
    }

    getProfilePic = (email)=>{
        // console.log(email.trim())
        const gravatarHash = md5(email.trim().toLowerCase());
        // console.log(gravatarHash)
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`
    }
    getInstrumentIcon = (instruments) =>{
        // return "/instrument_icons/guitar.png"
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
                return <img key={idx} className="instrument-mini-pic px-1" src={imgSrc} alt="instrument"/>
            })
        )
            
        }else{
            return <img className="instrument-mini-pic " src="/instrument_icons/no-waiting.png" alt="instrument"/>
        }

    }

    getPosts = () => {
        
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmitPost = event => {
        console.log("yay you clicked post!!")
        if (this.state.postInput.trim()) {
            api.addPost({
                content: this.state.postInput,
                creator: sessionStorage.getItem("userId"),
                jamId: this.props.jamId
            }).then(dbPost => {
                this.setState({
                    postInput: ""
                })
                this.getJam();
            }).catch(err => console.log(err))
        } else {
            sweetAlert("error", "warning-text", "Sorry, posts cannot be empty.")
        }
    }


    render() {
        return (
            <React.Fragment>
                {this.state.jamFound ? (
                    <div className="jam-bg">
                        <div className="jam-page-content container">
                            <br />
                            <div className="d-md-flex justify-content-around">
                                <div className="jam-section-wrapper d-block col-md-6">
                                    <div className="next-jam-section">
                                        <p className="text-center next-jam-title-text">{this.state.jamName}</p>
                                        <hr className="jam-page-separator"/>
                                        <div className="next-jam-wrapper d-flex container-fluid">
                                            <div className="next-jam-info col-12 jam-page-text-size">
                                                <p>Jam Name: {this.state.jamName}</p>
                                                <p>Creator: {this.state.jamCreator}</p>
                                                <p>Date: {moment(this.state.jamDate).format("LLL")}</p>
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
                                <div className="col-md-6 post-mobile-responsive">
                                    <div className="post-content-wrapper">
                                        <div className="post-display-section">
                                            <p className="text-center recent-jam-title-text">Posts</p>
                                            <div className="col-12 posts-wrapper">
                                                {this.state.posts ?
                                                        this.state.posts.map((post,idx)=>(
                                                        <div className="row post" key={idx}>
                                                            <img className="user-post-pic col-1 mx-0 px-0" src={this.getProfilePic(post.creator.email)} alt="Gravatar" />
                                                            <div className="col-2 mx-0 px-1" key={idx}>{post.creator.name}</div>
                                                            {/* <div className="jampage-instrument-wrapper col-3">
                                                                {this.getInstrumentIcon(member.instruments)}
                                                            </div> */}
                                                            <div className="col-9 post-content-style"><Linkify>{post.content}</Linkify></div>
                                                        
                                                        </div>
                                                        ))
                                                    
                                                        : <p>Loading...</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-end posting-function-wrapper">
                                            <TextareaAutosize
                                                id="post-input"
                                                name="postInput"
                                                rows={1}
                                                value={this.state.postInput}
                                                placeholder="write something"
                                                // disabled={this.state.bioDisabled}
                                                onChange={this.handleInputChange}
                                                className="form-control post-textarea posting-font-size"
                                            />
                                            <button className="btn btn-primary posting-font-size" onClick={this.handleSubmitPost}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!this.state.isMember && <Redirect to="/" />}
                        </div>
                        <Footer />
                    </div>
                ) : (
                    <NoMatch />
                )}
            </React.Fragment>
        )
    }
}

export default Jam;