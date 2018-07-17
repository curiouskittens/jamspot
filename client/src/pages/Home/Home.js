import React, { Component } from "react";
import "./Home.css";
import Footer from "../../components/Footer";

class Home extends Component {
    render() {
        return (
            <div className="home-bg">
                <div className="home-page-content container-fluid">
                    <div className="d-md-flex justify-content-around">
                        <div className="jam-section-wrapper d-block col-md-8">
                            <div className="next-jam-section">
                                <p className="text-center">Your Next Jam</p>
                                <div className="d-flex container-fluid">
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
                                <p className="text-center">Your Most Recent Jam</p>
                                <div className="d-flex container-fluid">
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