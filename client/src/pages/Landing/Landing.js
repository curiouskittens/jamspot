import React, { Component } from "react";
import Header from "../../components/Header";
import AppIntro from "../../components/AppIntro";

class Landing extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <AppIntro />
            </React.Fragment>
        )
    }
}

export default Landing;