import React, { Component } from "react";

class Jam extends Component {

    render() {
        return (
            <div className="card" style={{width: "40rem"}}>
                <div className="card-body" >
                    <h5 className="card-title">{this.props.jamName}</h5>
                    <p className="card-text">{this.props.description}</p>
                    {!this.props.requested && <button onClick={this.props.clickHandler} data-jamid={this.props.jamId} className="btn btn-primary">Join Jam</button>}
                </div>
            </div>
        )
    }

    
}

export default Jam;