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
import instrumentList from "../../utils/instruments.json";
import Modal from "react-modal";

// styling for modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
    }
};

Modal.setAppElement('#root');
class Jam extends Component {
    state = {
        jamName:"",
        jamCreator:"",
        jamDate:"",
        members: "",
        postInput: "",
        requests:"",
        posts:[],
        isMember: true,
        jamFound: true
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
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
                    if(this.validateAdmin(dbJam.data.admin)){
                        this.setState({
                            jamName: dbJam.data.name,
                            jamDate: dbJam.data.date,
                            jamCreator: dbJam.data.admin.name,
                            members: dbJam.data.members,
                            posts: dbJam.data.posts,
                            isAdmin: true,
                            requests: dbJam.data.joinRequests
                        })
                    }else if (this.validateUser(dbJam.data.members)) {
                        this.setState({
                            jamName: dbJam.data.name,
                            jamDate: dbJam.data.date,
                            jamCreator: dbJam.data.admin.name,
                            members: dbJam.data.members,
                            isAdmin: false,
                            posts: dbJam.data.posts,
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
    validateAdmin = admin => {
            if (admin._id === sessionStorage.getItem("userId")) {
                return true;
            } else {
                return false;
            }
    }

    getProfilePic = (email)=>{
        // console.log(email.trim())
        const gravatarHash = md5(email.trim().toLowerCase());
        // console.log(gravatarHash)
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`
    }
    getInstrumentIcon = (instruments) =>{
        // return "/instrument_icons/guitar.png"
        
        if(instruments.length>0) {
            return (instruments.map((instrument,idx) => {
                let imgSrc = "/instrument_icons/no-waiting.png"
                for(let i=0; i<instrumentList.length; i++){
                    if(instrumentList[i].name === instrument.name){
                        console.log("match")
                        imgSrc = instrumentList[i].icon
                    }
                }
                console.log(imgSrc)
                return <img key={idx} className="instrument-mini-pic px-1" src={imgSrc} alt="instrument"/>
            }))
        }else{
            console.log("else")
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

    
    joinRequestHandler = (event) => {
        console.log("Join Request Handler!!User Name: ", event.target.getAttribute("data-user-name"));
        this.setState({
            requestId: event.target.getAttribute("data-user-id"),
            requestUsername: event.target.getAttribute("data-user-username"),
            requestName: event.target.getAttribute("data-user-name"),
        });
        this.openModal()
    }

    acceptJoinRequest = () => {
        console.log("Accept: ", this.state.requestId)
        console.log("Jam Id: ", this.props.jamId)
        api.acceptJoinRequest({
            userId: this.state.requestId,
            jamId: this.props.jamId
        })
        this.setState({
            requestId: "",
            requestUsername: "",
            requestName: "",
            jamId: ""
        });
        this.getJam();
        this.closeModal();
    }

    declineJoinRequest = () => {
        console.log("Decline: ", this.state.requestId)
        console.log("Jam Id: ", this.props.jamId)
        api.declineJoinRequest({
            userId: this.state.requestId,
            jamId: this.props.jamId
        })
        this.setState({
            requestId: "",
            requestUsername: "",
            requestName: "",
            jamId: ""
        });
        this.getJam();
        this.closeModal();
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
                                                
                                                    {this.state.requests && this.state.requests.map((joinRequest, idx) => (
                                                        <React.Fragment key={idx}>
                                                            <h6 className="card-subtitle mb-2 text-muted">Join Requests</h6>
                                                            <button
                                                                onClick={this.joinRequestHandler}
                                                                className="btn btn-secondary mb-2"
                                                                data-user-name={joinRequest.name}
                                                                data-user-id={joinRequest._id}
                                                                data-user-username={joinRequest.username}
                                                            >
                                                                {joinRequest.name}
                                                            </button>
                                                        </React.Fragment>
                                                    ))}
                                                
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
                                                            <div className="col-8 col-lg-9 post-content-style"><Linkify>{post.content}</Linkify></div>
                                                        
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

                        <div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <button onClick={this.closeModal} className="toggle-modal-button">✖</button>
                            <div className="join-request-modal-wrapper">
                                <p ref={subtitle => this.subtitle = subtitle} className="text-center join-request-modal-title">Join Request</p>
                                <hr />
                                <p className="join-request-modal-content-text">Name: {this.state.requestName}</p>
                                <p className="join-request-modal-content-text">User Name: {this.state.requestUsername}</p>
                                <p className="join-request-modal-content-text">User ID: {this.state.requestId}</p>
                                <div className="d-flex justify-content-between">
                                <button onClick={this.acceptJoinRequest} className="btn btn-primary">Accept</button>
                                <button onClick={this.declineJoinRequest} className="btn btn-secondary">Decline</button>
                                </div>
                            </div>

                        </Modal>
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