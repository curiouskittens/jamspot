import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
    state = {
        footer: "footer",
        footerTriggerStyles: "footer-trigger-text-style text-center",
        footerShown: false
    }

    componentDidUpdate() {
        if(this.state.footerShown === true) {
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        }
    }

    toggleFooter = () => {
        if (this.state.footerShown === false) {
            let htmlBody = document.getElementsByTagName("html");
            console.log(htmlBody)
            htmlBody[0].style.height = "120%";
            this.setState({
                footer: "footer-click",
                footerTriggerStyles: "footer-trigger-text-style-clicked text-center",
                footerShown: true
            });
        } else {
            let htmlBody = document.getElementsByTagName("html");
            console.log(htmlBody)
            htmlBody[0].style.height = "100%";
            this.setState({
                footer: "footer",
                footerTriggerStyles: "footer-trigger-text-style text-center",
                footerShown: false
            })
        } 
    }

    renderFooter = () => {
        if (this.state.footerShown === false) {
            return(
                <div className={this.state.footerTriggerStyles} onClick={this.toggleFooter}>
                    Made by curiouskittens <i className="fas fa-paw"></i>
                </div>
            )
        } else {
            return(
                <div className={this.state.footerTriggerStyles} onClick={this.toggleFooter}>
                    Made by<a href="https://github.com/orgs/curiouskittens" target="react/jsx-no-target-blank"> curiouskittens <i className="fas fa-paw"></i></a>
                </div>
            )
        }
    }

    render() {
        return (
            <footer className={this.state.footer}>
                {this.renderFooter()}
                <div className="footer-wrapper">
                    <div className="container text-center">
                        <div className="footer-title-wrapper">
                            <h3 className="footer-project-text-style">Jamspot</h3>
                        </div>
                        <div>
                            <a href="https://github.com/carladdg" className="footer-link-text-style" target="react/jsx-no-target-blank">Carla Garcia</a>
                            <br />
                            <a href="https://github.com/davidbinstock" className="footer-link-text-style" target="react/jsx-no-target-blank">David Binstock</a>
                            <br />
                            <a href="https://github.com/heguanelvis" className="footer-link-text-style" target="react/jsx-no-target-blank">Guan He</a>
                            <br />
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;