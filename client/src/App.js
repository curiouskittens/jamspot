import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as pages from "./pages";
import NavBar from "./components/NavBar";

class App extends Component {
    state = {
        loggedIn: sessionStorage.getItem("userId") ? true : false,
    }

    loginUser = loginResult => this.setState({ loggedIn: loginResult })

    render() {
        return (
            <Router>
                <React.Fragment>
                    <NavBar loggedIn={this.state.loggedIn} loginUser={this.loginUser} />
                    <Switch>
                        <Route exact path="/" render={() => this.state.loggedIn ? <pages.Home /> : <pages.Landing />} />
                        <Route exact path="/signup" render={() => this.state.loggedIn ? <pages.Home /> : <pages.SignUp loginUser={this.loginUser} />} />
                        <Route exact path="/login" render={() => this.state.loggedIn ? <pages.Home /> : <pages.Login loginUser={this.loginUser} />} />
                        <Route exact path="/profile" render={() => this.state.loggedIn ? <pages.Profile /> : <pages.Landing />} />
                        <Route exact path="/createjam" render={() => this.state.loggedIn ? <pages.CreateJam /> : <pages.Landing />} />
                        <Route exact path="/findjam" render={() => this.state.loggedIn ? <pages.FindJam /> : <pages.Landing />} />
                        <Route exact path="/myjams" render={() => this.state.loggedIn ? <pages.MyJams /> : <pages.Landing />} />
                        <Route path="/jam/:id" render={({match}) => this.state.loggedIn ? <pages.Jam jamId={match.params.id} /> : <pages.Landing />} />
                        <Route component={pages.NoMatch} />
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
