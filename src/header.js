/* eslint-disable no-console */
import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
    };
  }

  render() {
    return (
      <header>
        <nav>
          <div className="logo">
            <Link to="/" className="logo">
              <i className="fab fa-viadeo" />
            </Link>
          </div>
          <div className="links">
            <div className="user-menu">
              {this.props.status && (
                <div>
                  <Link to="">Redesign</Link>
                  <Link to="">Donate</Link>
                  <Link to="">Browse</Link>
                </div>
              )}
              {!this.props.status && (
                <div>
                  <Link to="/process">Our Process</Link>
                  <Link to="/aboutUs">About Us</Link>
                  <Link to="/contactUs">Contact Us</Link>
                </div>
              )}
            </div>
          </div>
          <div className="on-off-links">
            <div className="login-status">
              {!this.props.status && (
                <div className="sign-on">
                  <Link to="/login" state={{ action: "login" }}>
                    Login
                  </Link>
                </div>
              )}
              {this.props.status && (
                <div className="sign-off">
                  <Link to="/logout">
                    <i className="fa fa-sign-out-alt" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
