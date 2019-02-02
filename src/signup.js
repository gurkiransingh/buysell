/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import axios from "axios";
import { navigate } from "@reach/router/lib/history";
import { redirectTo } from "@reach/router";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleFirstname = this.handleFirstname.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleDob = this.handleDob.bind(this);
    this.handleGender = this.handleGender.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      gender: "",
      username: "",
      password: ""
    };
  }
  handleFirstname(event) {
    this.setState({
      firstname: event.target.value
    });
  }
  handleLastname(event) {
    this.setState({
      lastname: event.target.value
    });
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handleDob(event) {
    this.setState({
      dob: event.target.value
    });
  }
  handleGender(event) {
    this.setState({
      gender: event.target.value
    });
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

  signUp(event) {
    let self = this;
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      axios
        .post("/register", {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          dob: this.state.dob,
          gender: this.state.gender,
          username: this.state.username,
          password: this.state.password
        })
        .then(function(response) {
          // eslint-disable-next-line no-console
          self.props.history.push("/login");
        });
    }
  }

  render() {
    return (
      <div className="signup-popup">
        <div className="signup">
          <form>
            <div className="basic-info">
              <label htmlFor="firstname">
                First Name
                <br />
                <input
                  type="text"
                  placeholder="First Name"
                  id="firstname"
                  onChange={this.handleFirstname}
                  required
                />
              </label>
              <label htmlFor="lastname">
                Last Name
                <br />
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleLastname}
                  required
                />
              </label>
              <label htmlFor="email">
                Email
                <br />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={this.handleEmail}
                  required
                />
              </label>
              <label htmlFor="dob">
                Birthday
                <br />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  onChange={this.handleDob}
                  required
                />
              </label>
            </div>
            <div className="creds-info">
              <label htmlFor="username">
                Chose a username
                <br />
                <input
                  type="text"
                  id="username"
                  onChange={this.handleUsername}
                  required
                />
              </label>
              <label htmlFor="password">
                Chose a password
                <br />
                <input
                  type="password"
                  id="password"
                  onChange={this.handlePass}
                  required
                />
              </label>
              <br />
              <div className="gender">
                <span>
                  <input
                    type="radio"
                    value="female"
                    checked={this.state.gender === "female"}
                    onChange={this.handleGender}
                  />
                  <label htmlFor="female">
                    <i className="fa fa-female" />
                  </label>
                </span>
                <span>
                  <input
                    type="radio"
                    value="male"
                    checked={this.state.gender === "male"}
                    onChange={this.handleGender}
                  />
                  <label htmlFor="male">
                    <i className="fa fa-male" />
                  </label>
                </span>
              </div>
            </div>

            <button onClick={this.signUp}>
              <span>Sign Up</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
