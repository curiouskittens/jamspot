import React, { Component } from "react";
import Jam from "../../components/Jam";
import api from "../../utils/api";
import Footer from "../../components/Footer";

// const userId = sessionStorage.getItem("userId");

class MyJams extends Component {
    state = {
        memberJams: [],
        adminJams: [],
        loggedIn: sessionStorage.getItem("userId") ? true : false
    }
    componentDidMount() {
        this.getJams();
    }

    getJams = () => {
        api.getMyJams(sessionStorage.getItem("userId")).then(dbUser => {
            console.log("Get My Jams")
            console.log(dbUser.data)
            dbUser.data.jams.forEach((jam,idx)=>{
                if (jam.admin === sessionStorage.getItem("userId")){
                    this.setState({ adminJams: this.state.adminJams.concat([ jam ]) });
                }else{
                    this.setState({ memberJams: this.state.memberJams.concat([ jam ]) });
                }
            })
            // this.setState({ jams: dbJams.data });
        })
    }

    clickHandler = (jamId) => {
        console.log("See Jam ", jamId)
        // if(this.state.loggedIn){
        //     console.log("you are logged in\nYour user ID is: ", sessionStorage.getItem("userId"))
        //     api.joinJamRequest({
        //       jamId: jamId,
        //       userId: sessionStorage.getItem("userId")
        //     }).then(result =>{
        //         console.log("success")
        //     }).catch(err => console.log(err))
        // }else{
        //     console.log("you are not logged in")
        // }
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="find-jam-page-bg">
                    <div className="find-jam-page-content container-fluid">
                        <h4>My Jams</h4>
                        <h6>I'm An Admin</h6>
                        {this.state.adminJams.map((jam,idx)=>(
                            <div className="card" style={{width: "40rem"}} key={idx}>
                                <div className="card-body" >
                                    <h5 className="card-title">{jam.name}</h5>
                                    <p className="card-text">{jam.description}</p>
                                    <button onClick={()=>this.clickHandler(jam._id)} data-jamid={jam._id} className="btn btn-primary">Join Jam</button>
                                </div>
                            </div>
                        ))}
                        <h6>I'm A Member</h6>
                        {this.state.memberJams.map((jam,idx)=>(
                            <Jam key={idx} jamName={jam.name} description={jam.description} jamId={jam._id} clickHandler={()=>this.clickHandler(jam._id)}/>
                        ))}
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        )
    }


}

export default MyJams;