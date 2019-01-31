import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleUsername = this.handleUsername.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePass(event) {
    this.setState({
      password: event.target.value
    });
  }

  logIn(event) {
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      let self = this;
      axios
        .post("/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(function(response) {
          let userInfo = response.data[0];
          sessionStorage.setItem("user", userInfo.username);
          self.props.status(true);
          self.props.history.push("/user");
        });
    }
  }

  render() {
    return (
      <div className="login-popup">
        <div className="login">
          <form>
            <label htmlFor="username">
              Username
              <br />
              <input
                id="username"
                type="text"
                placeholder="example@hotmail.com"
                onChange={this.handleUsername}
                required
              />
            </label>

            <label htmlFor="password">
              Password
              <br />
              <input
                id="password"
                type="password"
                placeholder="*****"
                pattern=".{3,10}"
                title="Password should be between 3 and 10 characters."
                onChange={this.handlePass}
              />
            </label>

            <button onClick={this.logIn}>
              <span>Login</span>
            </button>
            <div className="start-signup">
              Need to Sign Up? Click
              <Link to="/signUp">here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
