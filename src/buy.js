import React from "react";
import Item from './item';

class Buy extends React.Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1000,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'Ethnic',
        name: 'rogue',
        desc: 'Women striped sweater',
        price: 1200,
        size: ['S']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'Western',
        name: 'rogue',
        desc: 'Women striped sweater',
        price: 1200,
        size: ['S']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'Western',
        name: 'rogue',
        desc: 'Women striped sweater',
        price: 1200,
        size: ['S']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1000,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1000,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1000,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1000,
        size: ['M', 'L']
      }
    ]
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="buy-flow">
        <div className='buy-container'>
          <div className='filters'>

          </div>
          <Item items={this.items} />
        </div>
      </div>
    );
  }
}

export default Buy;
