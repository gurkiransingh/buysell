/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import axios from "axios";
import { toast } from 'react-toastify';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleFirstname = this.handleFirstname.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePin = this.handlePin.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      pinCode: "",
      username: "",
      password: "",
      loader: false
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
  handlePin(event) {
    this.setState({
      pinCode: event.target.value
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
    this.setState({
      loader: true
    })
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      axios
        .post("http://localhost:5000/register", {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          zip: this.state.pinCode,
          username: this.state.username,
          password: this.state.password
        })
        .then((response) => {
          this.setState({
            loader: false
          }, () => toast.success('Registered Successfully ! You can now login', {
              position: toast.POSITION.BOTTOM_CENTER
            })
          )
          this.props.history.push("/login");
        });
    }
  }

  render() {
    return (
      <div className={"signup-popup " + (this.state.loader ? 'fade' : '')}>
      {
        this.state.loader ? (<div className='spinner spinner-1'></div>) : null
      }
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
              <label htmlFor="pinCode">
                Pin Code
                <br />
                <input
                  type="number"
                  placeholder='Enter your area code'
                  onChange={this.handlePin}
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
