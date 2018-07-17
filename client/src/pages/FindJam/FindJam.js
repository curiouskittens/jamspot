import React, { Component } from "react";
import Jam from "../../components/Jam";
import api from "../../utils/api";

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
            this.setState({ jams: dbJams.data });
        })
    }

    joinJamEventHandler = (jamId) => {
        console.log("join jam!\nJam ID: ", jamId)
        if(this.state.loggedIn){
            console.log("you are logged in\nYour user ID is: ", sessionStorage.getItem("userId"))
        }else{
            console.log("you are not logged in")
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div style={{position: "relative", top: "100px"}}>
                <h4>My Jams</h4>
                {this.state.jams.map((jam,idx)=>(
                    <Jam key={idx} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={()=>this.joinJamEventHandler(jam._id)}/>
                ))}
                </div>
            </React.Fragment>
        )
    }


}

export default FindJam;