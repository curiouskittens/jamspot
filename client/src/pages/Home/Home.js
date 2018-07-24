import React, { Component } from "react";
import "./Home.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import Notification from "../../components/Notification";   

class Home extends Component {
    state = {

    }

    componentDidMount() {
        if (sessionStorage.getItem("userId")) {
            const userId = sessionStorage.getItem("userId");
            this.getNotifications(userId);
        } else {
            setTimeout(() => {
                const userId = sessionStorage.getItem("userId");
                this.getNotifications(userId);
            }, 100);
        }
    }

    getNotifications = userId => {
        api.getNotifications(userId)
            .then(result => {
                this.setState({
                    userMessages: result.data.notifications
                })
            })
            .catch(err => console.log(err));
    }

    renderNotifications = () => {
        if (this.state.userMessages) {
            return (
            <div className="notification-home-page-wrapper">
                {this.state.userMessages.map(userMessage => (<Notification key={userMessage._id} messageid={userMessage._id}>{userMessage.message}</Notification>))}
            </div>)
        }
    }

    render() {
        return (
            <div className="home-bg">
                <div className="home-page-content container-fluid">
                    {this.renderNotifications()}
                    <br />
                    <div className="d-md-flex justify-content-around">
                        <div className="jam-section-wrapper d-block col-md-8">
                            <div className="next-jam-section">
                                <p className="text-center next-jam-title-text">Your Next Jam</p>
                                <hr className="home-page-separator"/>
                                <div className="next-jam-wrapper d-flex container-fluid">
                                    <div className="next-jam-info col-6">
                                        <p>Jam Name</p>
                                        <p>Jam Location</p>
                                        <p>Jam Date</p>
                                    </div>
                                    <div className="next-jam-members col-6">
                                        <p>You</p>
                                        <p>Person 1</p>
                                        <p>Person 2</p>
                                        <p>Person 3</p>
                                    </div>
                                </div>
                            </div>
                            <div className="most-recent-jam-section">
                                <p className="text-center recent-jam-title-text">Your Most Recent Jam</p>
                                <hr className="home-page-separator" />
                                <div className="most-recent-jam-wrapper d-flex container-fluid">
                                    <div className="most-recent-jam-info col-6">
                                        <p>Jam Name</p>
                                        <p>Jam Location</p>
                                        <p>Jam Date</p>
                                    </div>
                                    <div className="most-recent-jam-members col-6">
                                        <p>You</p>
                                        <p>Person 1</p>
                                        <p>Person 2</p>
                                        <p>Person 3</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-simple-profile-section col-md-3">
                            <p>Name</p>
                            <p>Username</p>
                            <img className="img-fluid" src="http://rkhealth.com/wp-content/uploads/10.jpg" alt="profile snapshot"/>
                            <p>Location</p>
                            <p>Genre</p>
                            <p>Instruments:</p>
                            <div className="instrument-box"></div>
                        </div>
                    </div>
                    <div className="suggested-jams-section d-flex justify-content-around container-fluid">
                        <div className="suggested-jam-box col-3">
                            <p>Jam Name1</p>
                            <p>Location</p>
                            <p>Date</p>
                            <p>Genre</p>
                            <p>Intrument</p>
                        </div>
                        <div className="suggested-jam-box col-3">
                            <p>Jam Name2</p>
                            <p>Location</p>
                            <p>Date</p>
                            <p>Genre</p>
                            <p>Intrument</p>
                        </div>
                        <div className="suggested-jam-box col-3">
                            <p>Jam Name3</p>
                            <p>Location</p>
                            <p>Date</p>
                            <p>Genre</p>
                            <p>Intrument</p>
                        </div>
                    </div>
                </div>
            
                <Footer />
            </div>
        )
    }
}

export default Home;