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
import { BrowserRouter, Route } from "react-router-dom";

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
            path="/user"
            component={Profile}
            isLogged={this.state.isLogged}
          />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById("root"));
