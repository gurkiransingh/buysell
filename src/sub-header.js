import React from "react";
import { NavLink } from "react-router-dom";
import ReactTooltip from 'react-tooltip'


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
            <NavLink 
            to={`/user/${this.props.match.params.id}/feedback`} 
            activeClassName='selected'>FAQs</NavLink>
        </div>
        <div>
            <NavLink 
              to={`/user/${this.props.match.params.id}/orders`}
              activeClassName='selected'
              >Past orders</NavLink>
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
            <NavLink 
              to={`/user/${this.props.match.params.id}/returnExchange`}
              activeClassName='selected'
              >Return/Exchange</NavLink>
        </div>
        <div>
            <NavLink 
              to={`/user/${this.props.match.params.id}/updateInfo`}
              activeClassName='selected'
              >Update info</NavLink>
        </div>
        </div>
        <div className='cart' onClick={this.goToCart}>
        <p data-tip data-for='cart'><i className="fas fa-shopping-cart"></i></p>
        <ReactTooltip id='cart' type='info' effect='float'>
          <span>Open my cart</span>
        </ReactTooltip>
        <span>{this.props.id}</span>
        </div>
      </div>
    );
  }
}

export default SubHeader;
