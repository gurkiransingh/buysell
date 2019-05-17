import React from 'react';
import Axios from 'axios';
import OrdersList from './orders-list';
import Modal from 'react-responsive-modal';

class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            placedOn: [],
            loader: false,
            currentIndex: -1,
            open: false,
            items: [],
            shippingAddress: {
                firstname:'',
                lastname:'',
                addr1: '',
                addr2: '',
                landmark: '',
                city: '',
                state: '',
                zip: ''
            },
            totalPrice: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    componentDidMount() { 
        this.setState({
            loader: true
        })
        Axios.post('http://localhost:5000/getOrders', { userId: this.props.userId})
            .then((res) => {
                console.log(res);
                this.setState({
                    orders: res.data.orders,
                    placedOn: res.data.placedOn,
                    loader: false
                })
            })
    }

    onCloseModal (){
        this.setState({ open: false });
        };

    handleChange(i) {
        this.setState({
            currentIndex: i
          });
    }

    showDetailsModal(order) {
        this.setState({
            loader: true
        })
        Axios.post('http://localhost:5000/getOrderItems', {orderId: order.question})
            .then((res) => {
                console.log(res);
                this.setState({
                    loader: false,
                    open: true,
                    items: res.data.items,
                    shippingAddress: res.data.shippingAddress[0],
                    totalPrice: res.data.totalPrice
                })
            })
    }

    render() {
        return (
            <div className={'orders-container ' + (this.state.loader ? 'fade' : '')}>
            {
                this.state.loader ? (<div className='spinner spinner-1'></div>) : null
            }
                <div className='accordion'>
                    {
                        this.state.orders.map((order, i) => (
                            <OrdersList 
                                question={order}
                                date= {this.state.placedOn[i]}
                                handleChange={this.handleChange.bind(this, i)}
                                key={i}
                                index={i}
                                currentIndex={this.state.currentIndex}
                                showDetailsModal={this.showDetailsModal.bind(this)}
                            />
                        ))
                    }
                </div>
                <div>
                  <Modal open={this.state.open} onClose={this.onCloseModal} center>
                      <div className='order-details-modal'>
                        <p>Order placed</p>
                        <p>Items bought</p>
                        <div className='items'>
                            {
                                this.state.items.map((item, i) => (
                                    <div className='item'>
                                        <div>
                                            <p><span>{i+1}.</span><span>{item.name}</span></p>
                                            <p>{item.price}</p>
                                        </div>
                                        <p>{item.desc}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='total-price'>
                            <p>Total Price:</p>
                            <p>{this.state.totalPrice}</p>
                        </div>
                        <p>Shipped to : <span>{`${this.state.shippingAddress.firstname} ${this.state.shippingAddress.lastname}, ${this.state.shippingAddress.addr1}, ${this.state.shippingAddress.addr2}, ${this.state.shippingAddress.city} - ${this.state.shippingAddress.zip}`}</span></p>
                      </div>
                  </Modal>
                </div>
            </div>
        )
    }
}

export default Orders;