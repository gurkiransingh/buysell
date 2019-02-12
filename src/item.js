import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.openDetail = this.openDetail.bind(this);
    }

    openDetail() {
        console.log(this.props);
        this.props.history.history.push(`/user/${this.props.history.match.params.id}/buy/1234`);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='item' onClick={this.openDetail}>
                <div className='image-container'>
                <img src={this.props.item.pic} alt="clothing" className='image' />
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
            </div>
        )
    }
}

export default Item;