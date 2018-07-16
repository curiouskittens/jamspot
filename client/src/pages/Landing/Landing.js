import React, { Component } from "react";
import AppIntro from "../../components/AppIntro";
import Footer from "../../components/Footer";
import Jumbotron from "../../components/Jumbotron";

class Landing extends Component {
    render() {
        return (
            <React.Fragment>
                <Jumbotron />
                <AppIntro />
                <Footer />
            </React.Fragment>
        )
    }
}

export default Landing;