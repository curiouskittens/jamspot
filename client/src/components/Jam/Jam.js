import React, { Component } from "react";
import "./Jam.css";

class Jam extends Component {

    render() {
        return (
            <div className="col-md-6 jam-card-wrapper">
                <div className="card jam-card">
                    <div className="card-body" >
                        <h5 className="card-title">{this.props.jamName}</h5>
                        <p className="card-text">{this.props.description}</p>
                        {this.props.unrequested && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary">Join Jam</button>}
                        {this.props.memberjam && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary">See Jam</button>}
                    </div>
                </div>
            </div>
        )
    }

    
}

export default Jam;