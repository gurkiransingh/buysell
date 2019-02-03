import React from "react";
import { NavLink } from "react-router-dom";

class SubHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (!this.props.isLogged) {}
  }
  render() {
    return (
      <div className="sub-header">
      <div className='left-links'>
        <div>
            <NavLink to=''>Feedback</NavLink>
        </div>
        <div>
            <NavLink to=''>Past orders</NavLink>
        </div>
      </div>
        <div className='links'>
        <div>
        <NavLink
            to='/user/123/sell'
            activeClassName='selected-sub'>
            Sell
        </NavLink>
        </div>
        <div>
        <NavLink
            to='/user/123/buy'
            activeClassName='selected-sub'>
            Buy
        </NavLink>
        </div>
        </div>
        <div className='right-links'>
        <div>
            <NavLink to=''>Update info</NavLink>
        </div>
        <div>
            <NavLink to=''>Security</NavLink>
        </div>
        </div>
      </div>
    );
  }
}

export default SubHeader;
