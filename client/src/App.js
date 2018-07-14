import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as pages from "./pages";

class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route exact path="/" component={pages.Landing} />
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
