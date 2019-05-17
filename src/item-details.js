import React from 'react';
import Axios from 'axios';
import Image from './zoomable';
import { toast } from 'react-toastify';

class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);

        this.state = {
            loader: false
        }
    }

    addToCart() {
        this.setState({
            loader: true
        })
        Axios.post('http://localhost:5000/pushtocart', {
            itemId: this.props.location.state.id,
            custId: this.props.userId
        })
        .then((res) => {
            this.setState({
                loader: false
            })
            if(res.data) {
                this.props.addToCart();
                toast.info('Item added to cart !', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
        })
    }

    render() {
        return (
            <div className={'item-details ' + (this.state.loader ? 'fade' : '')}>
            {
                this.state.loader ? (<div className='spinner spinner-1'></div>) : null
            }
                <div className='pics'>
                <div>
                    <Image />
                </div>
                </div>
                <div className='details'>
                    <p className='title'>Name</p>
                    <p className='description'>This will a description which is more verbose than the one on the previous page</p>
                    <p className='horizontal-separator'></p>
                    <p className='size'>Available in <span>M</span></p>
                    <p className='price'>Rs 1200</p>
                    <div className='add-to-cart' onClick={this.addToCart}><p>Add to Cart</p></div>
                    <p className='horizontal-separator'></p>
                    <div className='details'>
                        <p>Product Details</p>
                        <p>Ipsum dolores elitr amet et dolor. Clita lorem lorem lorem dolores takimata consetetur ipsum et diam. Ea sed dolore diam invidunt et dolores sit amet. Elitr no dolor duo et, lorem vero duo diam sit vero gubergren stet, diam sed duo diam eirmod amet lorem, et dolore dolores et lorem stet dolore sit, elitr sed sed vero sanctus no magna lorem sed. Magna elitr sadipscing at aliquyam duo sanctus kasd..</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails;