import "../node_modules/normalize.css";
import "./sass/main.scss";
import React from "react";
import { render } from "react-dom";
import Header from "./header";
import HomePage from "./content";
import Footer from "./footer";
import Login from "./login";
import SignUp from "./signup";
import Logout from "./logout";
import Contact from "./contact-us";
import AboutUs from "./about-us";
import Process from "./process";
import UserProfile from './userProfile';

import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
      userId: null
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentWillMount() {
    if (sessionStorage.getItem("userId") != null) {
      this.userId = sessionStorage.getItem("userId");
      this.setState({ 
        isLogged: true ,
        userId: sessionStorage.getItem("userId")
      }, () => console.log('hi'));
    } else {
      this.setState({ isLogged: false, userId: null });
    }
  }

  changeStatus(bool, id) {
    this.setState({
      isLogged: bool,
      userId: id
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
          <Route 
            path='/' 
            component={props => (
              <Header {...props} userId={this.state.userId} isLogged={this.state.isLogged} />
            )}
            />
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
            path='/user/:id' 
             component={props => (
            <UserProfile {...props} isLogged={this.state.isLogged} userId={this.state.userId} />
            )}
            />
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
