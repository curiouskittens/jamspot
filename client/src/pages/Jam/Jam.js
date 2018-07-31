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
import { Link } from "react-router-dom";

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
        minWidth: '35%',
    }
};

Modal.setAppElement('#root');
class Jam extends Component {
    state = {
        jamName: "",
        jamCreator: "",
        jamDate: "",
        jamLocation: "",
        members: "",
        instruments: [],
        genres: [],
        postInput: "",
        requests:"",
        posts:[],
        isMember: true,
        jamFound: true,
        requestInstruments: [{ name: "", skill: "" }],
        requestGenres: [""]
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
                if (dbJam.data.name === "CastError") {
                    this.setState({ jamFound: false });
                } else {
                    if(this.validateAdmin(dbJam.data.admin)){
                        this.setState({
                            jamName: dbJam.data.name,
                            jamDate: dbJam.data.date,
                            jamCreator: dbJam.data.admin.name,
                            jamLocation: dbJam.data.location.address,
                            jamDescription: dbJam.data.description,
                            instruments: dbJam.data.instruments,
                            genres: dbJam.data.genres,
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
                            jamLocation: dbJam.data.location.address,
                            jamDescription: dbJam.data.description,
                            instruments: dbJam.data.instruments,
                            genres: dbJam.data.genres,
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
            .catch(err => console.log(err))
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

    getProfilePic = (email) => {
        const gravatarHash = md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`
    }

    getInstrumentIcon = (instruments) => {
        if (Array.isArray(instruments) && instruments.length > 0) {
            return (instruments.map((instrument, idx) => {
                let imgSrc = "/instrument_icons/none.png"
                for (let i = 0; i < instrumentList.length; i++) {
                    if (instrumentList[i].name === instrument.name) {
                        imgSrc = instrumentList[i].icon
                    }
                }
                return <img key={idx} className="instrument-mini-pic px-1 col-2" src={imgSrc} alt="instrument" />
            }))
        } else if (typeof instruments === "object" && instruments.name) {
            let imgSrc = "/instrument_icons/none.png"
                for (let i = 0; i < instrumentList.length; i++) {
                    if (instrumentList[i].name === instruments.name) {
                        imgSrc = instrumentList[i].icon
                    }
                }
            return <img key={instruments.name} className="instrument-mini-pic px-1 col-2" src={imgSrc} alt="instrument" />
        } else {
            return <img className="instrument-mini-pic" src="/instrument_icons/none.png" alt="instrument" />
        }

    }

    getPosts = () => {

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmitPost = event => {
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
        api.checkUsername(event.target.getAttribute("data-user-username"))
        .then(result => {
            const userInfo = result.data
            this.setState({
                requestId: userInfo._id,
                requestUsername: userInfo.username,
                requestName: userInfo.name,
                requestInstruments: userInfo.instruments,
                requestGenres: userInfo.genres
            });
            this.openModal()
        })
    }

    acceptJoinRequest = () => {
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
                                    <div className="next-jam-section-jampage">
                                        <p className="text-center next-jam-title-text">{this.state.jamName}</p>
                                        <hr className="jam-page-separator" />
                                        <div className="next-jam-wrapper d-flex container-fluid">
                                            <div className="next-jam-info col-12 jam-page-text-size">
                                                <div className="row">
                                                    <div className="col-4 text-left"> 
                                                        <p className="jam-card-subheadings pb-0 mb-1">Created by:</p>
                                                        <p>{this.state.jamCreator}</p>
                                                    </div>
                                                    <div className="col-4 text-center">
                                                        <p className="jam-card-subheadings pb-0 mb-1">When:</p>
                                                        <p>{moment(this.state.jamDate).format("LLL")}</p>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <p className="jam-card-subheadings pb-0 mb-1">Where:</p>
                                                        <p>{this.state.jamLocation}</p>
                                                    </div>
                                                </div>
                                                <p><span className="jam-card-subheadings">Description:</span> {this.state.jamDescription}</p>
                                                <p className="jam-card-subheadings pb-0 mb-1">Instruments:</p>
                                                {this.state.instruments.map((instrument,idx) => (
                                                    <div className="jam-card-instrument pr-2" key={idx}>
                                                        {this.getInstrumentIcon(instrument)}
                                                        <span>{instrument.name}</span>
                                                    </div>
                                                ))}
                                                <p className="jam-card-subheadings pb-0 mt-3 mb-1">Genres:</p>
                                                {this.state.genres.map((genre, idx) => (
                                                    <div key={idx}>{genre}</div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="most-recent-jam-section">
                                        <p className="text-center recent-jam-title-text">Members</p>
                                        <hr className="jam-page-separator" />
                                        <div className="jam-members-wrapper container-fluid">
                                            <div className="most-recent-jam-info all-members-section col-12">
                                                {this.state.members ?
                                                    this.state.members.map((member, idx) => (
                                                            <div className="row d-flex align-items-center justify-content-between single-member-wrapper" key={idx}>
                                                                <img className="user-mini-pic col-3 mx-0 px-0" src={this.getProfilePic(member.email)} alt="Gravatar" />
                                                            <div className="col-3 mx-0 px-0" key={idx}><Link to={`/profile/${member.username}`}>{member.name}</Link></div>
                                                                <div className="jampage-instrument-wrapper col-6 d-flex flex-wrap mx-0 px-0">
                                                                    {this.getInstrumentIcon(member.instruments)}
                                                                </div>
                                                            </div>
                                                    ))

                                                    : <p>Loading...</p>
                                                }
                                            </div>
                                            {this.state.requests[0] &&
                                                (
                                                <div className="join-requests-applicants-section col-12">
                                                    <p className="text-center recent-jam-title-text">Join Requests</p>
                                                    <div className="d-flex flex-wrap justify-content-around">
                                                        {this.state.requests && this.state.requests.map((joinRequest, idx) => (
                                                            <React.Fragment key={idx}>
                                                                <button
                                                                    onClick={this.joinRequestHandler}
                                                                    className="btn btn-secondary mb-2"
                                                                    data-user-username={joinRequest.username}
                                                                >
                                                                    {joinRequest.name}
                                                                </button>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 post-mobile-responsive">
                                    <div className="post-content-wrapper">
                                        <div className="post-display-section">
                                            <p className="text-center recent-jam-title-text">Posts</p>
                                            <div className="col-12 posts-wrapper">
                                                {this.state.posts ?
                                                    this.state.posts.map((post, idx) => (
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
                                        <div className="d-flex align-items-end posting-function-wrapper justify-content-between">
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
                                <p ref={subtitle => this.subtitle = subtitle} className="text-center join-request-modal-title">{this.state.requestName}</p>
                                <Link to={`/profile/${this.state.requestUsername}`}><p className="join-request-modal-content-text font-weight-bold text-center">@{this.state.requestUsername}</p></Link>
                                <hr />
                                <p className="join-request-modal-content-text font-weight-bold">Instruments:</p>
                                <div className="instrument-box">
                                    {this.state.requestInstruments[0] ?
                                        this.state.requestInstruments.map((instrument, index) => {
                                            let skillLevel = "";
                                            if (instrument.skill === 1) {
                                                skillLevel = "Beginner";
                                                return (
                                                    <div key={index}>
                                                        <p className="join-request-modal-content-small-text home-no-margin-bottom">{instrument.name} </p>
                                                        <div className="home-skillbar-background text-left">{skillLevel}</div>
                                                    </div>
                                                )
                                            } else if (instrument.skill === 2) {
                                                skillLevel = "Intermediate";
                                                return (
                                                    <div key={index}>
                                                        <p className="join-request-modal-content-small-text home-no-margin-bottom">{instrument.name} </p>
                                                        <div className="home-skillbar-background text-center">{skillLevel}</div>
                                                    </div>
                                                )
                                            } else if (instrument.skill === 3) {
                                                skillLevel = "Expert";
                                                return (
                                                    <div key={index}>
                                                        <p className="join-request-modal-content-small-text home-no-margin-bottom">{instrument.name} </p>
                                                        <div className="home-skillbar-background text-right">{skillLevel}</div>
                                                    </div>
                                                )
                                            } else if (!instrument.skill) {
                                                return (
                                                    <p key={index} className="join-request-modal-content-small-text">Looks like this user has not added any instruments.</p>
                                                )
                                            } else {
                                                return (
                                                    <p key={index} className="join-request-modal-content-small-text">Looks like there might be an error...</p>
                                                ) 
                                            }
                                        }) : (
                                            <p className="join-request-modal-content-small-text">Looks like this user has not added any instruments.</p>
                                        )
                                    }
                                </div>
                                <br/>
                                <p className="join-request-modal-content-text font-weight-bold">Genres:</p>
                                    {this.state.requestGenres[0] ?
                                        (
                                            <React.Fragment>
                                                {this.state.requestGenres.map((genre, index) => (
                                                    <p className="join-request-modal-content-small-text home-no-margin-bottom" key={index}>{genre}</p>
                                                ))}
                                            </React.Fragment>
                                        ) : (
                                            <p className="join-request-modal-content-small-text">Looks like this user has not added any genres.</p>
                                        )
                                    }
                                <br />
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