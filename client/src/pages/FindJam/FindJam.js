import React, { Component } from "react";
import JamCard from "../../components/JamCard";
import "./FindJam.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import sweetAlert from "../../utils/sweetAlert";
import moment from "moment";

class FindJam extends Component {
    state = {
        jams: [],
        requestedJams: [],
        loggedIn: sessionStorage.getItem("userId") ? true : false
    }

    componentDidMount() {
        this.getJams();
    }

    getJams = () => {
        api.getAllJams()
            .then(dbJams => {
                this.sortJams(dbJams.data)
        })
            .catch(err => console.log(err))
    }

    sortJams = jams => {
        const sortedJams = jams.sort((jamOne, jamTwo) => {
            const timeDifferenceOne = moment(jamOne.date) - moment();
            const timeDifferenceTwo = moment(jamTwo.date) - moment();
            return timeDifferenceOne - timeDifferenceTwo;
        })

        const upcomingJams = sortedJams.filter(jam => moment(jam.date) - moment() > 0);
        const filteredUpcomingJams = upcomingJams.filter(jam => jam.members.findIndex(member => member === sessionStorage.getItem("userId")) === -1)
        const openJams = filteredUpcomingJams.filter(jam => jam.joinRequests.findIndex(joinRequest => joinRequest === sessionStorage.getItem("userId")) === -1)
        const requestedJams = filteredUpcomingJams.filter(jam => jam.joinRequests.findIndex(joinRequest => joinRequest === sessionStorage.getItem("userId")) !== -1)
    
        this.setState({
            openJams: openJams,
            requestedJams: requestedJams
        });
    }

    joinJamEventHandler = jamId => {
        console.log("join jam!\nJam ID: ", jamId)
        if (this.state.loggedIn) {
            console.log("you are logged in\nYour user ID is: ", sessionStorage.getItem("userId"))
            api.joinJamRequest({
                jamId: jamId,
                userId: sessionStorage.getItem("userId")
            }).then(() => {
                console.log("success")
                sweetAlert("success", "success-text", "You have requested to join this jam.");
                this.getJams();
            }).catch(err => console.log(err))
        } else {
            console.log("you are not logged in")
        }
    }

    render() {
        return (
            <div className="find-jam-page-bg">
                <div className="find-jam-page-content container-fluid">
                    <p className="find-jam-page-title text-center">Find a Jam</p>
                    <div className="d-md-flex justify-content-around">
                        <div className="new-jam-section col-md-5">
                            <p className="text-center find-jam-section-title">Open Jams</p>
                            <hr />
                            <div className="row d-md-flex">
                                {this.state.openJams && this.state.openJams.map((jam, idx) => {
                                    console.log(jam.admin)
                                    return <JamCard
                                        classes={"col-md-12 jam-card-wrapper"}
                                        key={idx} 
                                        unrequested={true}
                                        creator={jam.admin} 
                                        jamName={jam.name}
                                        jamDate={jam.date} 
                                        description={jam.description}
                                        location={jam.location} 
                                        jamId={jam._id}
                                        instruments={jam.instruments}
                                        genres={jam.genres} 
                                        clickHandler={() => this.joinJamEventHandler(jam._id)}
                                    />
                                }
                                )}
                            </div>
                        </div>
                        <div className="requested-jam-section col-md-5">
                            <p className="text-center find-jam-section-title">Requested Jams</p>
                            <hr />
                            <div className="row d-md-flex">
                                {this.state.requestedJams && this.state.requestedJams.map((jam, idx) => (
                                    <JamCard
                                        classes={"col-md-12 jam-card-wrapper"}
                                        key={idx} 
                                        requested={true}
                                        creator={jam.admin}  
                                        jamName={jam.name} 
                                        jamDate={jam.date} 
                                        description={jam.description}
                                        location={jam.location} 
                                        jamId={jam._id}
                                        instruments={jam.instruments}
                                        genres={jam.genres}  
                                        clickHandler={() => this.joinJamEventHandler(jam._id)} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }


}

export default FindJam;