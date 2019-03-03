import React from 'react';
import Item from './item';
import Axios from 'axios';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.fetchUpdated = this.fetchUpdated.bind(this);
        this.payTM = this.payTM.bind(this);

        this.state = {
            cartItems: this.props.cartItems,
            totalPrice: 0
        }
    }

    componentDidMount() {
        let totalPrice = 0;
        Axios.post('http://localhost:5000/getCartItems', {custId: this.props.userId})
        .then((res) => {
            this.setState({
                cartItems: res.data
            }, () => {
                this.state.cartItems.map((item, index) => {
                    totalPrice += Number(item.price);
                })
                this.setState({
                    totalPrice: totalPrice
                })
            })
        });
        
    }

    fetchUpdated(item) {
        Axios.post('http://localhost:5000/deleteItemFromCart', {custId: this.props.userId, itemId: item._id})
            .then((res) => {
                console.log(res);
                if(res.data === true) {
                    this.props.getCartItems();
                }
            })
    }

    payTM() {
        Axios.post('http://localhost:5000/makePayloadForPaytm', { custId: this.props.userId, items: this.props.cartItems, fromCart: true})
            .then((res) => {
                this.props.history.push({
                    pathname: `/user/${this.props.userId}/pgredirect`,
                    state: { data: res.data}
                })
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
                <hr />
                <div className="total-price">
                 <div className='container'>
                     <p>Total Price</p>
                    <p>Rs {this.state.totalPrice}</p>
                 </div>
               </div>

               <button onClick={this.payTM}>Place Order</button>
            </div>
        )
    }
}

export default Cart;