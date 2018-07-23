import React, { Component } from "react";
import "./Notification.css";
import api from "../../utils/api";

class Notification extends Component {
    state = {
        
    }

    handleClick = event => {
        event.preventDefault();
        console.log(event.target.id);
        api.pullNotifications({
            userId: sessionStorage.getItem("userId"),
            messageid: event.target.id
        }).then(() => {
            console.log(event.target.parentElement)
            // event.target.parentElement.style.display = "none";
        })
        console.log(event.target.parentElement)
        console.log("clicked");
        event.target.parentElement.style.display = "none";
    }

    render() {
        return(
            <div className="notification d-flex justify-content-between">
                <p><i className="animated infinite pulse fas fa-bell"></i> {this.props.children}</p>
                <button className="delete-notification-button" id={this.props.messageid} onClick={this.handleClick}>✖</button>
            </div>
        )
    }
}

export default Notification;