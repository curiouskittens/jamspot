import React from "react";
import Footer from "../../components/Footer";
import "./NoMatch.css";

const NoMatch = () => (
  <div className="no-match-page-bg">
    <div className="no-match-page-content container-fluid text-center">
      <h1>404 Page Not Found</h1>
      <h1>
        <span role="img" aria-label="Face With Rolling Eyes Emoji">
          🙄
        </span>
      </h1>
    </div>
    <Footer />
  </div>
);

export default NoMatch;
