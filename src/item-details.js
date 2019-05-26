import React from 'react';
import Axios from 'axios';
import Image from './zoomable';
import { toast } from 'react-toastify';

class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.sizeSelected = this.sizeSelected.bind(this);

        this.state = {
            loader: false,
            ItemDetails: null,
            sizeSelected: null
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.id);
        Axios.post('/getItemDetailsFromId', { id: this.props.location.state.id})
            .then(res => {
                console.log(res.data);
                this.setState({
                    ItemDetails: res.data
                })
            })
    }

    sizeSelected(selectedSize, e) {
        console.log(selectedSize, e.target);
        this.setState({
            sizeSelected: selectedSize
        })
        let spans = document.getElementsByClassName('span-size');
        Array.prototype.map.call(spans, function(span) {
            span.classList.remove('make-size-selectable');
        })
        e.target.classList.add('make-size-selectable');
    }

    addToCart() {
        if(this.state.sizeSelected === null) {
            toast.error("Please select size !", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else {
            this.setState({
                loader: true
            })
            Axios.post('/pushtocart', {
                itemId: this.props.location.state.id,
                sizeSelected: this.state.sizeSelected,
                custId: this.props.userId
            })
            .then((res) => {
                this.setState({
                    loader: false
                })
                if(res.data) {
                    this.props.addToCart();
                    toast.success(res.data, {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                }
            })
        }
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
                    <p className='title'>{this.state.ItemDetails && this.state.ItemDetails.name}</p>
                    <p className='description'>This will a description which is more verbose than the one on the previous page</p>
                    <p className='horizontal-separator'></p>
                    <p className='sizes'>Select:
                       {
                           this.state.ItemDetails && this.state.ItemDetails.size.map((size) => <span className='span-size' onClick={this.sizeSelected.bind(this, size)}>{size}</span>) 
                       }
                    </p>
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