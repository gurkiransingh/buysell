import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.openDetail = this.openDetail.bind(this);
        this.deleteItemFromCart = this.deleteItemFromCart.bind(this);
    }

    openDetail() {
        console.log(this.props);
        this.props.history.history.push({
            pathname: `/user/${this.props.history.match.params.id}/buy/${this.props.item._id}`,
            state: {id : this.props.item._id}
        });
    }

    componentDidMount() {
    }

    deleteItemFromCart() {
        this.props.fetchUpdated(this.props.item);
    }

    render() {
        return (
            <div className='item'>
                <div className='image-container' onClick={this.openDetail}>
                <img src={this.props.item.pic} alt="clothing" className='image' />
                <div className='pseudo-hover'><span>Details</span></div>
                </div>
                <div className='desc'>
                    <p className='name'>{this.props.item.name}
                        {
                        this.props.item.size.map((v, i)=> {
                            return (<span key={i}>{v}</span>)
                        })
                        }
                        </p>
                    <p className='description'>{this.props.item.desc}</p>
                    <p className='price'>Rs {this.props.item.price}</p>
                </div>
                {
                    this.props.fromCart ? (<div onClick={this.deleteItemFromCart} className='delete-from-cart'>Delete from cart</div>) : null
                }
            </div>
        )
    }
}

export default Item;