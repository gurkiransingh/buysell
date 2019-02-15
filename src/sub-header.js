import React from "react";
import { NavLink } from "react-router-dom";

class SubHeader extends React.Component {
  constructor(props) {
    super(props);

    this.goToCart = this.goToCart.bind(this);
    this.cartItems = 0;
  }

  componentDidMount() {

  }

  goToCart() {
    this.props.history.push(`/user/${this.props.match.params.id}/cart`);
  }
  render() {
    return (
      <div className="sub-header">
      <div className='left-links'>
      <div>
            <NavLink to={`/user/${this.props.match.params.id}/feedback`} activeClassName='selected'>Feedback</NavLink>
        </div>
        <div>
            <NavLink to=''>Past orders</NavLink>
        </div>
      </div>
        <div className='links'>
        <div>
        <NavLink
            to={`/user/${this.props.match.params.id}/sell`}
            activeClassName='selected-sub'>
            Sell
        </NavLink>
        </div>
        <div>
        <NavLink
            to={`/user/${this.props.match.params.id}/buy`}
            activeClassName='selected-sub'>
            Buy
        </NavLink>
        </div>
        </div>
        <div className='right-links'>
        <div>
            <NavLink to=''>Return/Exchange</NavLink>
        </div>
        <div>
            <NavLink to=''>Update info</NavLink>
        </div>
        </div>
        <div className='cart' onClick={this.goToCart}>
        <p><i className="fas fa-shopping-cart"></i></p>
        <span>{this.props.id}</span>
        </div>
      </div>
    );
  }
}

export default SubHeader;
