/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    let self = this;
    axios.get("http://localhost:3000/logout").then(function(res) {
      if (res.data === "out") {
        sessionStorage.clear();
        self.props.logOutHandler();
        self.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div className="logout-container">
        <div className="logout">
          <form>
            <p>Please confirm logout ...</p>
            <div>
              <a onClick={this.logout}>YES</a>
              <Link to="/">NO</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Logout;
