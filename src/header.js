/* eslint-disable no-console */
import React from "react";
import { NavLink } from "react-router-dom";
import ReactTooltip from 'react-tooltip'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <header id='header'>
        <nav>
          <div className="logo">
            <NavLink to="/" className="logo">
              <i className="fab fa-viadeo" />
            </NavLink>
          </div>
          <div className="links">
            <div className="user-menu">
                <div>
                {this.props.isLogged && (
                  <NavLink 
                    to={`/user/${this.props.userId}`}
                    activeClassName='selected'
                    >My Profile</NavLink>
              )}
                  <NavLink 
                    to="/process"
                    activeClassName="selected"
                    >
                    Our Process
                  </NavLink>
                  <NavLink 
                    to="/aboutUs"
                    activeClassName="selected"
                    >
                    About
                  </NavLink>
                  <NavLink 
                    to="/contactUs"
                    activeClassName="selected"
                    >
                    Contact
                  </NavLink>
                </div>
            </div>
          </div>
          <div className="on-off-links">
            <div className="login-status">
              {!this.props.isLogged && (
                <div className="sign-on">
                  <NavLink to="/login" state={{ action: "login" }}>
                    Login
                  </NavLink>
                </div>
              )}
              {this.props.isLogged && (
                <div data-tip data-for='signoff' className="sign-off">
                  <NavLink to="/logout">
                    <i className="fa fa-sign-out-alt" />
                  </NavLink>
                  <ReactTooltip id='signoff' type='error' effect='float'>
                    <span>Sign Out</span>
                  </ReactTooltip>
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
