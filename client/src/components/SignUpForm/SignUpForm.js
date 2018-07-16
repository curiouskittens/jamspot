import React, { Component } from "react";
import "./SignUpForm.css";

class SignUpForm extends Component {
    render() {
        return (
            <div className="container">
                <form className="sign-up-form">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>  
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>               
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
                
export default SignUpForm;