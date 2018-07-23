import React, { Component } from "react";
import Jam from "../../components/Jam";
import "./FindJam.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";

class FindJam extends Component {
    state = {
        jams: [""],
        loggedIn: sessionStorage.getItem("userId") ? true : false
    }
    componentDidMount() {
        this.getJams();
    }

    getJams = () => {
        api.getAllJams().then(dbJams => {
            console.log(dbJams.data)
            const result = dbJams.data.filter(dbJam => dbJam.members.findIndex(member => member === sessionStorage.getItem("userId")) === -1)
            console.log(result)
            this.setState({ jams: result });
        })
    }

    joinJamEventHandler = jamId => {
        console.log("join jam!\nJam ID: ", jamId)
        if (this.state.loggedIn) {
            console.log("you are logged in\nYour user ID is: ", sessionStorage.getItem("userId"))
            api.joinJamRequest({
                jamId: jamId,
                userId: sessionStorage.getItem("userId")
            }).then(result => {
                console.log("success")
            }).catch(err => console.log(err))
        } else {
            console.log("you are not logged in")
        }
    }

    render() {
        return (
            <div className="find-jam-page-bg">
                <div className="find-jam-page-content container-fluid">
                    <h4>Find a Jam</h4>
                    {this.state.jams.map((jam, idx) => (
                        <Jam key={idx} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={() => this.joinJamEventHandler(jam._id)} />
                    ))}
                </div>
                <Footer />
            </div>
        )
    }


}

export default FindJam;