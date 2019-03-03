import React from 'react';
import Axios from 'axios';

class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            selectedOrder: ''
        }

        this.handleOrderClick = this.handleOrderClick.bind(this);
    }

    componentDidMount() {
        Axios.post('http://localhost:5000/getOrders', { userId: this.props.userId})
            .then((res) => {
                console.log(res);
                this.setState({
                    orders: res.data,
                    selectedOrder: res.data[0]
                })
            })
    }

    handleOrderClick(order) {
        this.setState({
            selectedOrder: order
        })
    }

    render() {
        return (
            <div className='orders-container'>
                <div className='order'>
                    {
                        this.state.orders.map((order, index) => {
                            return <p 
                                    onClick={this.handleOrderClick.bind(this, order)} 
                                    className = {this.state.selectedOrder === order ? 'selected' : ''}
                                    key={index}>
                                    {order}
                                    </p>
                        })
                    }
                </div>
                <div className='separator'>
                </div>
                <div className='feedback'>
                    <div className='header'>
                    {this.state.selectedOrder}
                    </div>
                    <div className='details'>Details of this order goes here</div>
                    <div className='form'>
                        <label>Post a query regarding this order</label>
                        <textarea></textarea>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders;