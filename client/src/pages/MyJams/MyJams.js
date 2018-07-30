import React, { Component } from "react";
import JamCard from "../../components/JamCard";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import "./MyJam.css";
import moment from "moment";


class MyJams extends Component {
    state = {
        allJams: [],
        upcomingJams: [],
        pastJams: [],
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
            allJams: [],
        });
        api.getMyJams(sessionStorage.getItem("userId")).then(dbUser => {
            console.log("Get My Jams")
            console.log(dbUser.data)
            dbUser.data.jams.forEach((jam, idx) => {
                this.setState({
                    allJams: this.state.allJams.concat([jam])
                }, () => this.sortJams(this.state.allJams));
            })
        })
    }

    sortJams = jams => {
        const sortedJams = jams.sort((jamOne, jamTwo) => {
            const timeDifferenceOne = moment(jamOne.date) - moment();
            const timeDifferenceTwo = moment(jamTwo.date) - moment();
            return timeDifferenceOne - timeDifferenceTwo;
        })

        const upcomingJams = sortedJams.filter(jam => moment(jam.date) - moment() > 0);
        if (upcomingJams.length) this.setState({ upcomingJams: upcomingJams });

        const pastJams = sortedJams.filter(jam => moment(jam.date) - moment() < 0).reverse();
        if (pastJams.length) this.setState({ pastJams: pastJams });
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
                        <br />
                        <h4 className="text-center my-jam-section-title">Upcoming Jams</h4>
                        <hr />
                        <div className="row d-md-flex">
                            {this.state.upcomingJams.length ? ( this.state.upcomingJams.map((jam, idx) => 
                                {
                                    if (jam.admin._id === sessionStorage.getItem("userId")) {
                                        return (<JamCard
                                            classes={"col-12 col-md-6 col-xl-4 jam-card-wrapper"}
                                            adminmarker={true}
                                            key={idx}
                                            seeJam={true}
                                            creator={jam.admin}
                                            jamName={jam.name}
                                            jamDate={jam.date}
                                            description={jam.description}
                                            location={jam.location}
                                            jamId={jam._id}
                                            instruments={jam.instruments}
                                            genres={jam.genres}
                                            clickHandler={() => this.clickHandler(jam._id)}
                                        />)
                                    } else {
                                        return (<JamCard
                                            classes={"col-12 col-md-6 col-xl-4 jam-card-wrapper"}
                                            key={idx}
                                            seeJam={true}
                                            creator={jam.admin}
                                            jamName={jam.name}
                                            jamDate={jam.date}
                                            description={jam.description}
                                            location={jam.location}
                                            jamId={jam._id}
                                            instruments={jam.instruments}
                                            genres={jam.genres}
                                            clickHandler={() => this.clickHandler(jam._id)}
                                        />)
                                    }
                                }
                            )) : (
                                <p className="mx-auto">You don't have any upcoming jams.</p>
                            )}
                        </div>
                        <h4 className="text-center my-jam-section-title">Past Jams</h4>
                        <hr />
                        <div className="row d-md-flex">
                            {this.state.pastJams.length ? ( this.state.pastJams.map((jam, idx) => 
                                {
                                    if (jam.admin._id === sessionStorage.getItem("userId")) {
                                        return (<JamCard
                                            classes={"col-12 col-md-6 col-xl-4 jam-card-wrapper"}
                                            adminmarker={true}
                                            key={idx}
                                            seeJam={true}
                                            creator={jam.admin}
                                            jamName={jam.name}
                                            jamDate={jam.date}
                                            description={jam.description}
                                            location={jam.location}
                                            jamId={jam._id}
                                            instruments={jam.instruments}
                                            genres={jam.genres}
                                            clickHandler={() => this.clickHandler(jam._id)}
                                        />)
                                    } else {
                                        return (<JamCard
                                            classes={"col-12 col-md-6 col-xl-4 jam-card-wrapper"}
                                            key={idx}
                                            seeJam={true}
                                            creator={jam.admin}
                                            jamName={jam.name}
                                            jamDate={jam.date}
                                            description={jam.description}
                                            location={jam.location}
                                            jamId={jam._id}
                                            instruments={jam.instruments}
                                            genres={jam.genres}
                                            clickHandler={() => this.clickHandler(jam._id)}
                                        />)
                                    }
                                }
                            )) : (
                                <p className="mx-auto">You don't have any past jams.</p>
                            )}
                        </div>
                    </div>

                    <Footer />
                </div>


            </React.Fragment>
        )
    }


}

export default MyJams;