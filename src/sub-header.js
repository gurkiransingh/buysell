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
        <div className='links'>
        <button>
        <NavLink
            to='/user/123/sell'
            activeClassName='selected-sub'>
            Sell
        </NavLink>
        </button>
        <button>
        <NavLink
            to='/user/123/buy'
            activeClassName='selected-sub'>
            Buy
        </NavLink>
        </button>
        </div>
      </div>
    );
  }
}

export default SubHeader;
