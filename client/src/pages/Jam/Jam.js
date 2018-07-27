import React, { Component } from "react";
import "./Jam.css";
import api from "../../utils/api";
import Footer from "../../components/Footer";

class Jam extends Component {
    state = {
        jamName:"",
        jamCreator:"",
        jamDate:"",
        members: [{name:"", instruments:[]}]
    }

    componentDidMount() {
        this.getJam()
    }

    getJam = () => {
        api.getOneJamById(this.props.jamId)
            .then(dbJam => {
                console.log(dbJam)
                this.setState({
                    jamName: dbJam.data.name,
                    jamDate: dbJam.data.date,
                    jamCreator: dbJam.data.admin.name,
                    members: dbJam.data.members
                })

            })
            .catch(err=>console.log(err))
    }

    renderNotifications = () => {
        
    }

    render() {
        return (
            <div className="jam-bg">
                <div className="jam-page-content container-fluid">
                    {this.renderNotifications()}
                    <br />
                    <div className="d-md-flex justify-content-around">
                        <div className="jam-section-wrapper d-block col-md-4">
                            <div className="next-jam-section">
                                <p className="text-center next-jam-title-text">{this.state.jamName}</p>
                                <hr className="jam-page-separator"/>
                                <div className="next-jam-wrapper d-flex container-fluid">
                                    <div className="next-jam-info col-12">
                                        <p>Jam Name: {this.state.jamName}</p>
                                        <p>Creator: {this.state.jamCreator}</p>
                                        <p>Date: {this.state.jamDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="most-recent-jam-section">
                                <p className="text-center recent-jam-title-text">Members</p>
                                <hr className="jam-page-separator" />
                                <div className="most-recent-jam-wrapper d-flex container-fluid">
                                    <div className="most-recent-jam-info col-12">
                                        {this.state.members.map(member=>(
                                            <div>{member.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-simple-profile-section col-md-8">
                            <p>Posts</p>
                        </div>
                    </div>
                </div>
            
                <Footer />
            </div>
        )
    }
}

export default Jam;