import React from 'react';
import { Route } from 'react-router-dom';
import Sell from './sell';
import Buy from './buy';
import ItemDetails from './item-details';
import Feedback from './feedback';
import Profile from "./profile";
import SubHeader from './sub-header';
import Cart from './cart';
import Axios from 'axios';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            cartItems: null
        }

        this.addToCart = this.addToCart.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.getCartItems = this.getCartItems.bind(this);

        this.x = 0;

    }

    addToCart() {
        this.getCartItems();
    }

    deleteFromCart() {
        this.x = this.state.id -1;
        this.setState({
            id: this.x
        })
    }

    componentDidMount() {
        let self = this;
        if (!this.props.isLogged && !this.props.userId) {
            this.props.history.push('/login');
          }
        this.getCartItems();
    }

    getCartItems() {
        let self = this;
        Axios.post('http://localhost:5000/getCartItems', {custId: this.props.userId})
        .then(function(res) {
            console.log(res.data);
            console.log(typeof(res.data))
            self.setState({
                id: res.data.length,
                cartItems: res.data
            })
        });
    }
    render() {
        return (
            <div>
             <Route
                path={this.props.match.path}
                component={props => (
                <SubHeader {...props} id={this.state.id}/>
                )}
              />
                <Route
                    exact path={this.props.match.path}
                    component={Profile}
                />
                <Route
                    path={`${this.props.match.path}/sell`}
                    component={Sell}
                />
                <Route
                    exact
                    path={`${this.props.match.path}/buy`}
                    component={props => (
                    <Buy {...props}  />
                    )}
                />
                <Route
                    path={`${this.props.match.path}/buy/:id`}
                    component={props => (
                    <ItemDetails {...props} itemsInCart={this.state.id} addToCart={this.addToCart} userId={this.props.userId} />
                    )}
                />
                <Route
                    path={`${this.props.match.path}/cart`}
                    component={props => (
                    <Cart {...props} getCartItems={this.getCartItems} cartItems={this.state.cartItems} userId={this.props.userId} />
                    )}
                />
                <Route
                    path={`${this.props.match.path}/feedback`}
                    component={Feedback}
                />
            </div>
        )
    }
}

export default UserProfile;