import React, { Component } from "react";
import Header from "../../components/Header";
import AppIntro from "../../components/AppIntro";
import Footer from "../../components/Footer";

class Landing extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <AppIntro />
                <Footer />
            </React.Fragment>
        )
    }
}

export default Landing;