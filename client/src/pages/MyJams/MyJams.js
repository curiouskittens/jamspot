import React, { Component } from "react";
// import JamCard from "../../components/JamCard";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "./MyJam.css";


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
                                                    <Link to={{
                                                            pathname: ('/jam/'+jam._id),
                                                            state: {jamId: jam._id}
                                                        }}
                                                        className="admin-jam-see-jam-button"
                                                    >
                                                        <button onClick={() => this.clickHandler(jam._id)} data-jamid={jam._id} className="btn btn-primary">
                                                            See Jam
                                                        </button>
                                                    </Link>
                                                    <br /><br />

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
                                            <Link to={{
                                                    pathname: ('/jam/'+jam._id),
                                                    state: {jamId: jam._id}
                                                }}
                                                className="admin-jam-see-jam-button"
                                            >
                                                <button onClick={() => this.clickHandler(jam._id)} data-jamid={jam._id} className="btn btn-primary">
                                                    See Jam
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>


            </React.Fragment>
        )
    }


}

export default MyJams;