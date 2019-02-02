import "../node_modules/normalize.css";
import "./sass/main.scss";
import React from "react";
import { render } from "react-dom";
import Header from "./header";
import HomePage from "./content";
import Footer from "./footer";
import Login from "./login";
import SignUp from "./signup";
import Profile from "./profile";
import Logout from "./logout";
import Contact from "./contact-us";
import AboutUs from "./about-us";
import Process from "./process";
import SubHeader from './sub-header'
import Sell from './sell';
import Buy from './buy';

import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("user") != null) {
      this.setState({ isLogged: true });
    } else {
      this.setState({ isLogged: false });
    }
  }

  changeStatus(bool) {
    this.setState({
      isLogged: bool
    });
  }

  handleLogout() {
    sessionStorage.clear();
    this.setState({ isLogged: false });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header path="/" status={this.state.isLogged} />
          <Route exact path="/" component={HomePage} />
          <Route
            path="/login"
            component={props => <Login {...props} status={this.changeStatus} />}
          />
          <Route
            path="/signup"
            component={props => (
              <SignUp {...props} status={this.changeStatus} />
            )}
          />
          {this.state.isLogged ? (
            <Route
              exact
              path="/logout"
              render={props => (
                <Logout logOutHandler={this.handleLogout} {...props} />
              )}
            />
          ) : null}
          <Route
            path="/user/123"
            component={SubHeader}
            isLogged={this.state.isLogged}
          />
          <Switch>
          <Route
            exact path="/user/123"
            component={Profile}
            isLogged={this.state.isLogged}
          />
          <Route
            path="/user/123/sell"
            component={Sell}
            isLogged={this.state.isLogged}
          />
           <Route
            path="/user/123/buy"
            component={Buy}
            isLogged={this.state.isLogged}
          />
          </Switch>
          <Route
            path="/contactUs"
            component={Contact}
            isLogged={this.state.isLogged}
          />
          <Route
            path="/aboutUs"
            component={AboutUs}
            isLogged={this.state.isLogged}
          />
          <Route
            path="/process"
            component={Process}
            isLogged={this.state.isLogged}
          />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById("root"));
