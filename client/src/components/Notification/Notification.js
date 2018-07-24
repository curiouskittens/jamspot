import React, { Component } from "react";
import "./Notification.css";
import api from "../../utils/api";

class Notification extends Component {
    state = {
        clickedId: ""
    }

    handleClick = event => {
        event.preventDefault();
        console.log(event.target.id);
        const clickedId = event.target.id;
        api.pullNotifications({
            userId: sessionStorage.getItem("userId"),
            messageid: event.target.id
        })
        this.setState({
            clickedId: clickedId,
        })
    }

    renderMessage = () => {
        if(this.state.clickedId !== this.props.messageid) {
            return(
                <div className="notification d-flex justify-content-between">
                    <p><i className="animated infinite pulse fas fa-bell"></i> {this.props.children}</p>
                    <button className="delete-notification-button" id={this.props.messageid} onClick={this.handleClick}>✖</button>
                </div>
            )
        }
    }

    render() {
        return(
            <React.Fragment>
                {this.renderMessage()}
            </React.Fragment>
        )
    }
}

export default Notification;