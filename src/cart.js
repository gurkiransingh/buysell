import React from 'react';
import Item from './item';
import Axios from 'axios';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.fetchUpdated = this.fetchUpdated.bind(this);

        this.state = {
            cartItems: this.props.cartItems
        }
    }

    componentDidMount() {
        let self = this;
        Axios.post('/getCartItems', {custId: this.props.userId})
        .then(function(res) {
            self.setState({
                cartItems: res.data
            })
        });
        
    }

    fetchUpdated(item) {
        console.log(item);
        let self = this;
        Axios.post('/deleteItemFromCart', {custId: this.props.userId, itemId: item._id})
            .then(function(res) {
                console.log(res);
                if(res.data === true) {
                    self.props.getCartItems();
                }
            })
    }

    render() {
        return (
            <div className='cart-container'>
                <div className='items-container'>
                {
                this.state.cartItems.map((v,i) => {
                    return (
                    <Item fetchUpdated={this.fetchUpdated} items={this.props.cartItems} item={v} key={i} history={this.props} fromCart={true}/>
                         )   
                    })
                 } 
                </div>
                <div className="total-price">
                 <div className='container'>
                     <p>Total Price</p>
                    <p>Rs 5000</p>
                 </div>
               </div>
            </div>
        )
    }
}

export default Cart;