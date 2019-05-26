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
import ReturnExchange from './returnExchange';
import Redirect from './redirect';
import Axios from 'axios';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            cartItems: null,
            personal: null,
            addresses: null,
            itemsBought: null,
            sizes: []
        }

        this.addToCart = this.addToCart.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.getuserData = this.getuserData.bind(this);
        this.getOrderItems = this.getOrderItems.bind(this);

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
        document.getElementById('header').style.position = 'relative';
        let self = this;
        if (!this.props.isLogged && !this.props.userId) {
            this.props.history.push('/login');
          }
        this.getCartItems();
        this.getuserData();
        this.getOrderItems();
    }

    componentWillUnmount() {
        document.getElementById('header').style.position = 'sticky';
    }

    getOrderItems() {
        Axios.post('/getPotentialReturnItems', {userId: this.props.match.params.id})
            .then(res => {
                this.setState({
                    itemsBought: res.data
                })
            })
    }


    getCartItems() {
        Axios.post('/getCartItems', {custId: this.props.userId})
        .then((res) => {
            console.log(res.data);
            this.setState({
                id: res.data.items.length,
                cartItems: res.data.items,
                sizes: res.data.sizes
            })
        });
    }

    getuserData(fromUpdate) {
        let self = this;
        Axios.post('/getUserDetails', {userId: this.props.match.params.id})
        .then(function(res) {
            let personal = {
                firstName: res.data.firstname,
                lastName: res.data.lastname,
                email: res.data.email,
                number: res.data.phone
            }
            self.setState({
                personal: personal,
                addresses: res.data.addresses
            });
        })
    }

    render() {
        return (
            <div className='min-height'>
             <Route
                path={this.props.match.path}
                component={props => (
                <SubHeader {...props} id={this.state.id}/>
                )}
              />
                <Route
                    exact path={`${this.props.match.path}`}
                    component={props => (
                        <Profile {...props}  pInfo={this.state.personal} userId={this.props.userId} />
                        )}
                />
                <Route
                    path={`${this.props.match.path}/sell`}
                    component={props => (
                        <Sell {...props}  userId={this.props.userId} />
                        )}
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
                    <Cart {...props} getCartItems={this.getCartItems} sizes={this.state.sizes} cartItems={this.state.cartItems} userId={this.props.userId} />
                    )}
                />
                <Route 
                    path={`${this.props.match.path}/pgredirect`}
                    component={props => (
                        <Redirect {...props} />
                    )}
                />
                <Route
                    path={`${this.props.match.path}/feedback`}
                    component={Feedback}
                />
                <Route
                    path={`${this.props.match.path}/updateInfo`}
                    component={props => (
                    <UpdateInfo {...props} pInfo={this.state.personal} getUserInfo={this.getuserData} userId={this.props.userId} />
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
                    <ReturnExchange {...props} userId={this.props.userId} itemsBought={this.state.itemsBought} />
                    )}
                />
            </div>
        )
    }
}

export default UserProfile;