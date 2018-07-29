import React, { Component } from "react";
import md5 from "js-md5";
import moment from "moment";
import "./Home.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";
import Notification from "../../components/Notification";
import Slider from 'react-slick';
import { Link } from "react-router-dom";

const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 3,
    responsive: [{ breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1,} }, { breakpoint: 1024, settings: { slidesToShow: 2 } }, { breakpoint: 100000, settings: { slidesToShow: 3 } }]
};

class Home extends Component {
    state = {
        name: "",
        username: "",
        image: "",
        genres: [""],
        instruments: [{ name: "", skill: "" }],
        userMessages: [],
        nextJam: { name: "", date: "", members: [] },
        mostRecentJam: { name: "", date: "", members: [] },
        searchJamsSubsets: [],
        searchJams: [{ name: "", date: "", members: [] }]
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
            if (searchJams.length) {
                this.setState({searchJams: searchJams})
            }
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
                        {this.state.userMessages.map(
                            userMessage => {
                                if (userMessage.messageType === "accepted") {
                                    return (<Notification key={userMessage._id} messageid={userMessage._id}>You have been accepted to <Link to={`/jam/${userMessage.jamId}`}>{userMessage.jamName}</Link>. Have fun!</Notification>)
                                } else if (userMessage.messageType === "joinRequest") {
                                    return (<Notification key={userMessage._id} messageid={userMessage._id}>A new user has requested to join <Link to={`/jam/${userMessage.jamId}`}>{userMessage.jamName}</Link>.</Notification>)
                                } else {
                                    return (<Notification key={userMessage._id} messageid={userMessage._id}>You have not been accepted into {userMessage.jamName}. Why don't you <Link to="/findjam">look for another jam</Link>?</Notification>)
                                }
                            }
                    )}
                    </div>)
        }
    }

    renderSuggestedJams = () => {
        if(this.state.searchJams[0].name) {
            return this.state.searchJams.map((jam, idx) => (
                            <div className="suggested-jam-box-wrapper" key={jam.name}>
                                <div className="suggested-jam-box">
                                    <p className="suggested-jam-title-text">{jam.name}</p>
                                    {jam.location && <p>{jam.location.address } </p>}
                                    <p>{moment(jam.date).format("LLL")}</p>
                                    {jam.genres.map((genre, index) => (
                                        <p key={index}>{genre}</p>
                                    ))}
                                    {jam.instruments.map((instrument, index) => (
                                        <p key={index}>{instrument.name}: {instrument.quantity}</p>
                                    ))}
                                </div>
                            </div>
            ))
        }
    }

    render() {
        return (
            <div className="home-bg">
                <div className="home-page-content container">
                    {this.renderNotifications()}
                    <br />
                    <div className="d-md-flex justify-content-around align-items-between">
                        <div className="jam-section-wrapper d-block col-md-7 col-xl-8">
                            <div className="next-jam-section">
                                <p className="text-center next-jam-title-text">Your Next Jam</p>
                                <hr className="home-page-separator" />
                                <div className="next-jam-wrapper d-flex container-fluid">
                                    {this.state.nextJam.name ? (
                                        <React.Fragment>
                                            <div className="next-jam-info col-6 text-center">
                                                <p>{this.state.nextJam.name}</p>
                                                {this.state.nextJam.location && <p>{this.state.nextJam.location.address } </p>}
                                                <p>{moment(this.state.nextJam.date).format("LLL")}</p>
                                            </div>
                                            <div className="next-jam-members col-6 text-center">
                                                {this.state.nextJam.members.map((member, index) => (
                                                    <p key={index}>{member.name} {!index && <span>(Host)</span>}</p>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                            <p className="text-center no-info-yet-text col-12">You don't have any upcoming jams.</p>
                                        )}

                                </div>
                            </div>
                            <div className="most-recent-jam-section">
                                <p className="text-center recent-jam-title-text">Your Most Recent Jam</p>
                                <hr className="home-page-separator" />
                                <div className="most-recent-jam-wrapper d-flex container-fluid">
                                    {this.state.mostRecentJam.name ? (
                                        <React.Fragment>
                                            <div className="most-recent-jam-info col-6 text-center">
                                                <p>{this.state.mostRecentJam.name}</p>
                                                {this.state.mostRecentJam.location && <p>{this.state.mostRecentJam.location.address } </p> }
                                                <p>{moment(this.state.mostRecentJam.date).format("LLL")}</p>
                                            </div>
                                            <div className="most-recent-jam-members col-6 text-center">
                                                {this.state.mostRecentJam.members.map((member, index) => (
                                                    <p key={index}>{member.name} {!index && <span>(Host)</span>}</p>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                            <p className="col-12 text-center no-info-yet-text">You don't have any past jams.</p>
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className="user-simple-profile-section col-md-4 col-xl-3">
                            <p className="user-simple-profile-title text-center">{this.state.name}</p>
                            <p className="text-center">@{this.state.username}</p>
                            <img className="img-fluid user-simple-profile-pic-style" src={this.state.image} alt="profile snapshot" />
                            <br/> <br/>
                            <p>Location</p>
                            <p className="home-no-margin-bottom">Genres</p>
                                {this.state.genres[0] ?
                                    (
                                        <ul>
                                            {this.state.genres.map((genre, index) => (
                                                <li className="user-simple-profile-small-text" key={index}>{genre}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="user-simple-profile-small-text">Head to your profile to add some genres.</p>
                                    )
                                }
                            <p className="home-no-margin-bottom">Instruments</p>
                            <div className="instrument-box">
                                    {this.state.instruments[0].name ?
                                        this.state.instruments.map((instrument, index) => {
                                            let skillLevel = "";
                                            if (instrument.skill === 1) {
                                                skillLevel = "Beginner";
                                                return (
                                                    <div key={index}>
                                                        <p className="user-simple-profile-small-text home-no-margin-bottom">{instrument.name}: </p>
                                                        <div className="home-skillbar-background text-left">{skillLevel}</div>
                                                    </div>
                                                )
                                            } else if (instrument.skill === 2) {
                                                skillLevel = "Intermediate";
                                                return (
                                                    <div key={index}>
                                                        <p className="user-simple-profile-small-text home-no-margin-bottom">{instrument.name}: </p>
                                                        <div className="home-skillbar-background text-center">{skillLevel}</div>
                                                    </div>
                                                )
                                            } else if (instrument.skill === 3) {
                                                skillLevel = "Expert";
                                                return (
                                                    <div key={index}>
                                                        <p className="user-simple-profile-small-text home-no-margin-bottom">{instrument.name}: </p>
                                                        <div className="home-skillbar-background text-right">{skillLevel}</div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <p className="user-simple-profile-small-text">Looks like there might be an error...</p>
                                                )
                                            }
                                        }) : (
                                            <p className="user-simple-profile-small-text">Head to your profile to add some instruments.</p>
                                        )
                                    }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.searchJams[0].name ? 
                        (
                            this.state.searchJams.length > 3 ? 
                            (
                            <div className="suggested-jams-section">
                                <Slider className="suggested-jam-slider" {...settings}>
                                    {this.renderSuggestedJams()}
                                </Slider>
                            </div>
                            ) : (
                            <div className="suggested-jams-section d-md-flex justify-content-around">
                                    {this.renderSuggestedJams()}
                            </div>
                            )
                        ) : (
                            <div className="no-suggested-jam-section"><p className="text-center">There are no jams for you to join right now. Why don't you <Link to="/createjam">create one</Link>?</p></div>
                        )
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;