import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className='items-container'>
             { 
                this.props.items.map((v,i) => {
                return (<div className='item' key={i}>
                    <img src={v.pic} alt="clothing" className='image' />
                    <div className='desc'>
                        <p className='name'>{v.name}
                            {
                            v.size.map((v)=> {
                                return (<span>{v}</span>)
                            })
                            }
                            </p>
                        <p className='description'>{v.desc}</p>
                        <p className='price'>Rs {v.price}</p>
                    </div>
                </div>
                )
             })
            }
            </div>
        )
    }
}

export default Item;