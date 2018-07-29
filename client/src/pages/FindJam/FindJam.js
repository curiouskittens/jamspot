import React, { Component } from "react";
import JamCard from "../../components/JamCard";
import "./FindJam.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import sweetAlert from "../../utils/sweetAlert";

class FindJam extends Component {
    state = {
        jams: [""],
        requestedJams: [""],
        loggedIn: sessionStorage.getItem("userId") ? true : false
    }

    componentDidMount() {
        this.getJams();
    }

    getJams = () => {
        api.getAllJams()
            .then(dbJams => {
                const result = dbJams.data.filter(dbJam => dbJam.members.findIndex(member => member === sessionStorage.getItem("userId")) === -1)
                const jams = result.filter(jam => jam.joinRequests.findIndex(joinRequest => joinRequest === sessionStorage.getItem("userId")) === -1)
                const requestedJams = result.filter(jam => jam.joinRequests.findIndex(joinRequest => joinRequest === sessionStorage.getItem("userId")) !== -1)
                this.setState({
                    jams: jams,
                    requestedJams: requestedJams
                });
        })
            .catch(err => console.log(err))
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
                            <p className="text-center find-jam-section-title">Check out these jams</p>
                            <hr />
                            <div className="row d-md-flex">
                                {this.state.jams.map((jam, idx) => (
                                    <JamCard key={idx} unrequested={true} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={() => this.joinJamEventHandler(jam._id)} />
                                ))}
                            </div>
                        </div>
                        <div className="requested-jam-section col-md-5">
                            <p className="text-center find-jam-section-title">Jams you have requested</p>
                            <hr />
                            <div className="row d-md-flex">
                                {this.state.requestedJams.map((jam, idx) => (
                                    <JamCard key={idx} requested={true} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={() => this.joinJamEventHandler(jam._id)} />
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