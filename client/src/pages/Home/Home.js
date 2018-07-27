import React, { Component } from "react";
import md5 from "js-md5";
import moment from "moment";
import "./Home.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import Notification from "../../components/Notification";

class Home extends Component {
    state = {
        name: "",
        username: "",
        image: "",
        genres: [""],
        instruments: [{ name: "", skill: "" }],
        userMessages: [],
        nextJam: { name: "", location: "", date: "", members: [] },
        mostRecentJam: { name: "", location: "", date: "", members: [] },
        searchJams: [{ name: "", location: "", date: "", members: [] }]
    }

    componentDidMount() {
        this.populateHomePage(sessionStorage.getItem("userId"));
        this.getJams();

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

    populateHomePage = userId => {
        api.populateHomePage(userId)
            .then(user => {
                const gravatarHash = md5(user.data.email.trim().toLowerCase())
                this.setState({
                    name: user.data.name,
                    username: user.data.username,
                    image: `https://www.gravatar.com/avatar/${gravatarHash}?d=mp&s=200`,
                })

                if (user.data.genres[0]) this.setState({ genres: user.data.genres })
                if (user.data.instruments[0]) this.setState({ instruments: user.data.instruments })
                if (user.data.jams[0]) this.setState({ jams: user.data.jams }, () => this.sortJams(this.state.jams));
            })
    }

    getJams = () => {
        api.getAllJams().then(dbJams => {
            const result = dbJams.data.filter(dbJam => dbJam.members.findIndex(member => member === sessionStorage.getItem("userId")) === -1)
            const searchJams = result.filter(jam => jam.joinRequests.findIndex(joinRequest => joinRequest === sessionStorage.getItem("userId")) === -1)
            if (searchJams.length) this.setState({ searchJams: searchJams });
            console.log(searchJams);
        })
    }

    sortJams = jams => {
        const sortedJams = jams.sort((jamOne, jamTwo) => {
            const timeDifferenceOne = moment(jamOne.date) - moment();
            const timeDifferenceTwo = moment(jamTwo.date) - moment();
            return timeDifferenceOne - timeDifferenceTwo;
        })

        const upcomingJams = sortedJams.filter(jam => moment(jam.date) - moment() > 0);
        if (upcomingJams.length) this.setState({ nextJam: upcomingJams[0] })

        const pastJams = sortedJams.filter(jam => moment(jam.date) - moment() < 0);
        if (pastJams.length) this.setState({ mostRecentJam: pastJams.slice(-1)[0] });
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
                                <hr className="home-page-separator" />
                                <div className="next-jam-wrapper d-flex container-fluid">
                                    {this.state.nextJam.name ? (
                                        <React.Fragment>
                                            <div className="next-jam-info col-6">
                                                <p>{this.state.nextJam.name}</p>
                                                <p>{this.state.nextJam.location}</p>
                                                <p>{moment(this.state.nextJam.date).format("LLL")}</p>
                                            </div>
                                            <div className="next-jam-members col-6">
                                                {this.state.nextJam.members.map((member, index) => (
                                                    <p key={index}>{member.name} {!index && <span>(Host)</span>}</p>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                            <p>You don't have any upcoming jams.</p>
                                        )}

                                </div>
                            </div>
                            <div className="most-recent-jam-section">
                                <p className="text-center recent-jam-title-text">Your Most Recent Jam</p>
                                <hr className="home-page-separator" />
                                <div className="most-recent-jam-wrapper d-flex container-fluid">
                                    {this.state.mostRecentJam.name ? (
                                        <React.Fragment>
                                            <div className="most-recent-jam-info col-6">
                                                <p>{this.state.mostRecentJam.name}</p>
                                                <p>{this.state.mostRecentJam.location}</p>
                                                <p>{moment(this.state.mostRecentJam.date).format("LLL")}</p>
                                            </div>
                                            <div className="most-recent-jam-members col-6">
                                                {this.state.mostRecentJam.members.map((member, index) => (
                                                    <p key={index}>{member.name} {!index && <span>(Host)</span>}</p>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                            <p>You don't have any past jams.</p>
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className="user-simple-profile-section col-md-3">
                            <p>{this.state.name}</p>
                            <p>@{this.state.username}</p>
                            <img className="img-fluid" src={this.state.image} alt="profile snapshot" />
                            <p>Location</p>
                            <p>Genres</p>
                            <ul>
                                {this.state.genres[0] ?
                                    this.state.genres.map((genre, index) => (
                                        <li key={index}>{genre}</li>
                                    )) : (
                                        <p>Head to your profile to add some genres.</p>
                                    )
                                }
                            </ul>
                            <p>Instruments</p>
                            <div className="instrument-box">
                                <ul>
                                    {this.state.instruments[0].name ?
                                        this.state.instruments.map((instrument, index) => {
                                            let skillLevel = "";
                                            if (instrument.skill === 1) {
                                                skillLevel = "Beginner";
                                            } else if (instrument.skill === 2) {
                                                skillLevel = "Intermediate";
                                            } else if (instrument.skill === 3) {
                                                skillLevel = "Expert";
                                            }

                                            return (
                                                <li key={index}>{instrument.name}: {skillLevel}</li>
                                            )
                                        }) : (
                                            <p>Head to your profile to add some instruments.</p>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="suggested-jams-section d-flex justify-content-around container-fluid">
                        {this.state.searchJams[0].name && this.state.searchJams.map((jam, index) => (
                            <div className="suggested-jam-box col-3" key={index}>
                                <p>{jam.name}</p>
                                <p>{jam.location}</p>
                                <p>{moment(jam.date).format("LLL")}</p>
                                {jam.genres.map((genre, index) => (
                                    <p key={index}>{genre}</p>
                                ))}
                                {jam.instruments.map((instrument, index) => (
                                    <p key={index}>{instrument.name}: {instrument.quantity}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Home;