import React from 'react';

class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='item-details'>
                <div className='pics'>
                    <img src='https://picsum.photos/251/301' alt='' />
                    <img src='https://picsum.photos/251/301' alt='' />
                    <img src='https://picsum.photos/251/301' alt='' />
                    <img src='https://picsum.photos/251/301' alt='' />
                </div>
                <div className='details'>
                    <p className='title'>Name</p>
                    <p className='description'>This will a description which is more verbose than the one on the previous page</p>
                    <p className='horizontal-separator'></p>
                    <p className='size'>Available in <span>M</span></p>
                    <p className='price'>Rs 1200</p>
                    <div className='add-to-cart'>
                        <p>Add to Cart</p>
                    </div>
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