import React from 'react';
import { Route } from 'react-router-dom';
import Sell from './sell';
import Buy from './buy';
import ItemDetails from './item-details';
import Feedback from './feedback';
import Profile from "./profile";
import SubHeader from './sub-header';
import Cart from './cart';
import UpdateInfo from './update-info';
import Orders from './orders';
import ReturnExchange from './returnExcahnge';
import Axios from 'axios';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            cartItems: null,
            personal: null,
            address: null
        }

        this.addToCart = this.addToCart.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.getuserData = this.getuserData.bind(this);

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
        this.getuserData();
    }


    getCartItems() {
        let self = this;
        Axios.post('http://localhost:5000/getCartItems', {custId: this.props.userId})
        .then(function(res) {
            self.setState({
                id: res.data.length,
                cartItems: res.data
            })
        });
    }

    getuserData(fromUpdate) {
        let self = this;
        Axios.post('http://localhost:5000/getUserDetails', {userId: this.props.match.params.id})
        .then(function(res) {
            let personal = {
                firstName: res.data.firstname,
                lastName: res.data.lastname,
                email: res.data.email,
                number: res.data.phone
            }
            let address = {
                addr1: res.data.addr1,
                addr2: res.data.addr2,
                city: res.data.city,
                zip: res.data.pinCode,
                state: res.data.state
            }
            self.setState({
                personal: personal,
                address: address
            });
        })
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
                    exact path={`${this.props.match.path}`}
                    component={props => (
                        <Profile {...props}  pInfo={this.state.personal} />
                        )}
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
                <Route
                    path={`${this.props.match.path}/updateInfo`}
                    component={props => (
                    <UpdateInfo {...props} pInfo={this.state.personal} aInfo={this.state.address} getUserInfo={this.getuserData} userId={this.props.userId} />
                    )}
                />
                 <Route
                    path={`${this.props.match.path}/orders`}
                    component={props => (
                    <Orders {...props} userId={this.props.userId} />
                    )}
                />
                <Route
                    path={`${this.props.match.path}/returnExchange`}
                    component={props => (
                    <ReturnExchange {...props} userId={this.props.userId} />
                    )}
                />
            </div>
        )
    }
}

export default UserProfile;