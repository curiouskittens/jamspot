import React, { Component } from "react";
// import Jam from "../../components/Jam";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./MyJam.css";

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

class MyJams extends Component {
    state = {
        memberJams: [],
        adminJams: [],
        loggedIn: sessionStorage.getItem("userId") ? true : false,
        jamId: "",
        requestName: "",
        requestUsername: "",
        requestId: "",
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
        this.getJams();
    }

    getJams = () => {
        this.setState({
            memberJams: [],
            adminJams: []
        });
        api.getMyJams(sessionStorage.getItem("userId")).then(dbUser => {
            console.log("Get My Jams")
            console.log(dbUser.data)
            dbUser.data.jams.forEach((jam, idx) => {
                if (jam.admin === sessionStorage.getItem("userId")) {
                    this.setState({ adminJams: this.state.adminJams.concat([jam]) });
                } else {
                    this.setState({ memberJams: this.state.memberJams.concat([jam]) });
                }
            })
        })
    }

    clickHandler = (jamId) => {
        console.log("See Jam ", jamId)
    }

    joinRequestHandler = (event) => {
        console.log("Join Request Handler!!User Name: ", event.target.getAttribute("data-user-name"));
        this.setState({
            requestId: event.target.getAttribute("data-user-id"),
            requestUsername: event.target.getAttribute("data-user-username"),
            requestName: event.target.getAttribute("data-user-name"),
            jamId: event.target.getAttribute("data-jam-id")
        });
        this.openModal()
    }

    acceptJoinRequest = () => {
        console.log("Accept: ", this.state.requestId)
        console.log("Jam Id: ", this.state.jamId)
        api.acceptJoinRequest({
            userId: this.state.requestId,
            jamId: this.state.jamId
        })
        this.setState({
            requestId: "",
            requestUsername: "",
            requestName: "",
            jamId: ""
        });
        this.getJams();
        this.closeModal();
    }

    declineJoinRequest = () => {
        console.log("Decline: ", this.state.requestId)
        console.log("Jam Id: ", this.state.jamId)
        api.declineJoinRequest({
            userId: this.state.requestId,
            jamId: this.state.jamId
        })
        this.setState({
            requestId: "",
            requestUsername: "",
            requestName: "",
            jamId: ""
        });
        this.getJams();
        this.closeModal();
    }

    render() {
        return (
            <React.Fragment>
                <div className="find-jam-page-bg">
                    <div className="find-jam-page-content container-fluid">
                        <p className="my-jam-page-title text-center">My Jams</p>
                        <div className="d-md-flex justify-content-around">
                            <div className="admin-jam-section col-md-5">
                                <p className="my-jam-section-title text-center">I'm An Admin</p>
                                <hr />
                                <div className="row d-md-flex">
                                    {this.state.adminJams.map((jam, idx) => (
                                        <div className="col-md-6 admin-jam-card-wrapper" key={idx}>
                                            <div className="card admin-jam-card">
                                                <div className="card-body" >
                                                    <h5 className="card-title">{jam.name}</h5>
                                                    <p className="card-text">{jam.description}</p>
                                                    <button onClick={() => this.clickHandler(jam._id)} data-jamid={jam._id} className="btn btn-primary">
                                                        <Link to={{
                                                            pathname: ('/jam/'+jam._id),
                                                            state: {jamId: jam._id}
                                                        }}
                                                        className="admin-jam-see-jam-button"
                                                        >
                                                            See Jam
                                                        </Link>
                                                    </button>
                                                    <br /><br />
                                                    <h6 className="card-subtitle mb-2 text-muted">Join Requests</h6>
                                                    {jam.joinRequests.map((joinRequest, idx) => (
                                                        <React.Fragment key={idx}>
                                                            <br />
                                                            <br />
                                                            <button
                                                                onClick={this.joinRequestHandler}
                                                                className="btn btn-secondary"
                                                                data-jam-id={jam._id}
                                                                data-user-name={joinRequest.name}
                                                                data-user-id={joinRequest._id}
                                                                data-user-username={joinRequest.username}
                                                            >
                                                                {joinRequest.name}
                                                            </button>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="member-jam-section col-md-5">
                                <p className="my-jam-section-title text-center">I'm A Member</p>
                                <hr />
                                {this.state.memberJams.map((jam, idx) => (
                                    <div className="col-md-6 admin-jam-card-wrapper" key={idx}>
                                    <div className="card admin-jam-card">
                                        <div className="card-body" >
                                            <h5 className="card-title">{jam.name}</h5>
                                            <p className="card-text">{jam.description}</p>
                                            <button onClick={() => this.clickHandler(jam._id)} data-jamid={jam._id} className="btn btn-primary">
                                                <Link to={{
                                                    pathname: ('/jam/'+jam._id),
                                                    state: {jamId: jam._id}
                                                }}
                                                    className="admin-jam-see-jam-button"
                                                >
                                                    See Jam
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
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


            </React.Fragment>
        )
    }


}

export default MyJams;