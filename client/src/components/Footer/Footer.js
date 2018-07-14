import React from "react";
import "./Footer.css";

const Footer = () => (
    <footer className="footer">
        <div className="footer-trigger-text-style text-center">                    
            Made by<a href="https://github.com/orgs/curiouskittens" className="" target="react/jsx-no-target-blank"> curiouskittens <i className="fas fa-paw"></i></a>
        </div>
        <div className="footer-wrapper">
            <div className="container text-center">
                <div className="footer-title-wrapper">
                    <h3 className="footer-project-text-style">Jamspot</h3>
                </div>
                <div>
                    <a href="https://github.com/carladdg" className="footer-link-text-style" target="react/jsx-no-target-blank">Carla Garcia</a>
                    <br/>
                    <a href="https://github.com/davidbinstock" className="footer-link-text-style" target="react/jsx-no-target-blank">David Binstock</a>
                    <br/>
                    <a href="https://github.com/heguanelvis" className="footer-link-text-style" target="react/jsx-no-target-blank">Guan He</a>
                    <br/>
                </div>
            </div>
        </div>
    </footer>
)

export default Footer;