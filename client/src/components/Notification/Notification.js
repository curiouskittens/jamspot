import React, { Component } from "react";
import "./Notification.css";

class Notification extends Component {
    state = {

    }

    render() {
        return(
            <div className="notification d-flex justify-content-between">
                <p><i className="animated infinite pulse fas fa-bell"></i> {this.props.children}</p>
                <button className="delete-notification-button">✖</button>
            </div>
        )
    }
}

export default Notification;