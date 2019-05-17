import React from 'react';
import Item from './item';
import Axios from 'axios';
import Modal from 'react-responsive-modal';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.fetchUpdated = this.fetchUpdated.bind(this);
        this.payTM = this.payTM.bind(this);

        this.state = {
            cartItems: this.props.cartItems,
            totalPrice: 0,
            open: false,
            showOtherAddrs: false,
            selectedAddressIndex: undefined,
            other: false,
            defaultAddress: [{
                firstname: '',
                lastname: '',
                addr1: '',
                addr2: '',
                landmark: '',
                city: '',
                state: '',
                zip: ''
            }],
            otherAddresses: [{
                firstname: '',
                lastname: '',
                addr1: '',
                addr2: '',
                landmark: '',
                city: '',
                state: '',
                zip: ''
            }]
        }

        this.onCloseModal = this.onCloseModal.bind(this);
        this.reviewOrder = this.reviewOrder.bind(this);
        this.displayAddresses = this.displayAddresses.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.restoreDefault = this.restoreDefault.bind(this);
    }

    componentDidMount() {
        let totalPrice = 0;
        Axios.post('/getCartItems', {custId: this.props.userId})
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

        Axios.post('/getDefaultAddress', {userId: this.props.userId,  onlyDefault: true})
            .then((res) =>{
                this.setState({
                    defaultAddress: res.data
                })
            })
        
    }

    restoreDefault() {
        this.setState({
            selectedAddressIndex: undefined,
            other: false,
            showOtherAddrs: false
        })
    }

    displayAddresses() {
        Axios.post('/getAddresses', {userId: this.props.userId, exceptDefault: true})
            .then((res) => {
                this.setState({
                    otherAddresses: res.data,
                    showOtherAddrs: true
                })
            })
    }

    reviewOrder() {
        console.log(this.state.cartItems);
        this.setState({
            open: true
        })
    }

    onCloseModal () {
        this.setState({ open: false });
    };

    handleChange(event) {
        console.log(event.target.value)
        this.setState({
            selectedAddressIndex: event.target.value,
            other: true
        })
    }

    fetchUpdated(item) {
        Axios.post('/deleteItemFromCart', {custId: this.props.userId, itemId: item._id})
            .then((res) => {
                console.log(res);
                if(res.data === true) {
                    this.props.getCartItems();
                }
            })
    }

    payTM() {
        let shippingAddress;
        if (!this.state.other) {
            shippingAddress = this.state.defaultAddress;
        } else {
            shippingAddress = this.state.otherAddresses[this.state.selectedAddressIndex]
        }
        console.log(shippingAddress);
        Axios.post('/makePayloadForPaytm', { custId: this.props.userId, items: this.props.cartItems, fromCart: true, shippingAddress: shippingAddress, totalPrice: this.state.totalPrice})
            .then((res) => {
                this.props.history.push({
                    pathname: `/user/${this.props.userId}/pgredirect`,
                    state: { data: res.data}
                })
            })
    }

    render() {
        return (
            <div>
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

                <button onClick={this.reviewOrder}>Review Order</button>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className='review-order-modal'>
                        <div className='header'>Review Order</div>
                        <div className='items'>
                            {
                                this.state.cartItems.map((item, i) => (
                                    <div className='item' key={i}>
                                        <div>
                                            <p><span>{i+1}. </span><span>{item.name}</span></p>
                                            <p>{item.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='total-price'>
                            <span>Total:</span><span>{this.state.totalPrice}</span>
                        </div>
                        <div className='shipping-address'>
                            <p>Default Shipping Address: <span>{`${this.state.defaultAddress[0].firstname} ${this.state.defaultAddress[0].lastname} ,${this.state.defaultAddress[0].addr1}, ${this.state.defaultAddress[0].addr2} (${this.state.defaultAddress[0].landmark}) , ${this.state.defaultAddress[0].city} - ${this.state.defaultAddress[0].state}  (${this.state.defaultAddress[0].zip})`}</span></p>
                            <p></p>
                        </div>
                        <form className='change-address'>
                            <p>Click<span onClick={this.displayAddresses}> here</span> to choose a different shipping address:</p>
                            {
                                this.state.other && (
                                    <p>Click <span onClick={this.restoreDefault}>here</span> to choose default</p>
                                )
                            }
                            {
                                this.state.showOtherAddrs && this.state.otherAddresses.map((address, i)=> (
                                    <div key={i}>
                                        <input 
                                            type='radio' 
                                            id={`address${i}`} 
                                            checked={Number(this.state.selectedAddressIndex) === i}
                                            value={i}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor={`address${i}`}>{`${address.firstname} ${address.lastname}, ${address.addr1}, ${address.addr2} ${address.landmark} , ${address.city} - ${address.state}  (${address.zip})`}</label>
                                    </div>
                                ))
                            }
                        </form>
                        <div className='place-order'>
                            <button onClick={this.payTM}>Place Order</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Cart;