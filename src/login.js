import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleUsername = this.handleUsername.bind(this);

    this.state = {
      username: "",
      password: "",
      loader: false
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
      this.setState({
        loader: true
      })
      axios
        .post("/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then((response) => {
          console.log(response);
          this.setState({
            loader: false
          }, () => toast.success("Logged in successfully !", {
            position: toast.POSITION.BOTTOM_CENTER
          }));
          let userInfo = response.data[0];
          sessionStorage.setItem("userId", userInfo._id);
          this.props.status(true, userInfo._id);
          this.props.history.push(`/user/${userInfo._id}`);
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loader: false
          })
          toast.error("Something went wrong !", {
            position: toast.POSITION.BOTTOM_CENTER
          });
        });
    }
  }

  render() {
    return (
      <div className={'login-popup ' + (this.state.loader ? 'fade' : '')}>
      {
        this.state.loader ? (<div className='spinner spinner-1'></div>) : null
      }
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
