import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import * as pages from "./pages";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <h1>Jamspot!</h1>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Log In</button></Link>
          <Switch>
            <Route exact path="/signup" component={pages.SignUp} />
            <Route exact path="/login" component={pages.Login} />
            <Route component={pages.NoMatch} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
