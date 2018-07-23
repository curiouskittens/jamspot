import React, { Component } from "react";
import Jam from "../../components/Jam";
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
        this.getNotifications();
    }

    getJams = () => {
        api.getAllJams().then(dbJams => {
            console.log(dbJams.data)
            const result = dbJams.data.filter(dbJam => dbJam.members.findIndex(member => member === sessionStorage.getItem("userId")) === -1)
            const jams = result.filter(jam => jam.joinRequests.findIndex(joinRequest => joinRequest === sessionStorage.getItem("userId")) === -1)
            console.log(jams)
            const requestedJams = result.filter(jam => jam.joinRequests.findIndex(joinRequest => joinRequest === sessionStorage.getItem("userId")) !== -1)
            console.log(requestedJams)
            this.setState({
                jams: jams,
                requestedJams: requestedJams
            });
        })
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

    getNotifications = () => {
        api.getNotifications(sessionStorage.getItem("userId"))
            .then(notification => {
                this.setState({
                    userMessages: notification.data.notifications
                })
            })
            .catch(err => console.log(err));
    }

    renderNotifications = () => {
        if(this.state.userMessages){
            return this.state.userMessages.map(userMessage => (<h5 key={userMessage.name}>{userMessage.message}</h5>))
        }
    }

    render() {
        return (
            <div className="find-jam-page-bg">
                <div className="find-jam-page-content container-fluid">
                {this.renderNotifications()}
                    <h4>Find a Jam</h4>
                    <h5>All Jams</h5>
                    {this.state.jams.map((jam, idx) => (
                        <Jam key={idx} requested={false} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={() => this.joinJamEventHandler(jam._id)} />
                    ))}
                    <br />
                    <br />
                    <h5>Requested Jams</h5>
                    {this.state.requestedJams.map((jam, idx) => (
                        <Jam key={idx} requested={true} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={() => this.joinJamEventHandler(jam._id)} />
                    ))}
                </div>
                <Footer />
            </div>
        )
    }


}

export default FindJam;