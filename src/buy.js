import React from "react";
import Item from './item';

class Buy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clothType: ['Featured', 'denim', 'western', 'ethnic', 'tops', 'shorts'],
      clothTypeSelected: 'Featured',
      priceType: ['Featured', 'low to high', 'high to low'],
      priceTypeSelected: 'Featured'
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);

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
    console.log(this.props.history);
  }

  handleTypeChange(e) {
    this.setState({
      clothTypeSelected: e.target.value
    })
  }

  handlePriceChange(e) {
    this.setState({
      priceTypeSelected: e.target.value
    })
  }

  render() {
    return (
      <div className="buy-flow">
        <div className='buy-container'>
          <div className='filters'>
            <p className='sort-by'>Sort By:</p>
            <div className='pair'>
              <label>Type</label>
              <select value={this.state.clothTypeSelected} onChange={this.handleTypeChange}>
              {
                this.state.clothType.map((v, i) => {
                  return <option key={i} value={v} >{v}</option>
                })
              }
            </select>
          </div>
          <div className='pair'>
          <label>Price</label>
            <select value={this.state.priceTypeSelected} onChange={this.handlePriceChange}>
              {
                this.state.priceType.map((v, i) => {
                  return <option key={i} value={v}>{v}</option>
                })
              }
            </select>
          </div>
          </div>
          <div className='items-container'>
          {
            this.items.map((v,i) => {
              return (
                <Item item={v} key={i} history={this.props.history}/>
              )
            })
          }
            </div>
        </div>
      </div>
    );
  }
}

export default Buy;
