import React from "react";
import Item from './item';
import Axios from 'axios';

class Buy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clothType: ['Featured', 'denim', 'western', 'Ethnic', 'tops', 'shorts'],
      clothTypeSelected: 'Featured',
      priceType: ['Select', 'low to high', 'high to low'],
      priceTypeSelected: 'Select',
      items : []
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);

    this.originalItems  = [];

  }

  componentDidMount() {
    let self = this;
    Axios.get('http://localhost:5000/getAllItems')
      .then((res) => {
        self.originalItems = res.data;
        self.setState({
          items: res.data
        })
      })
  }

  handleTypeChange(e) {
    this.setState({
      items: this.originalItems
    })
    this.setState({
      clothTypeSelected: e.target.value
    }, () => {
      this.setState(prevState => ({
        items: prevState.items.filter((v,i) => (
          v.type.toLowerCase() === this.state.clothTypeSelected.toLowerCase() || this.state.clothTypeSelected === 'Featured'
        ))
      }))
    })
    this.setState({
      priceType: ['Select', 'low to high', 'high to low']
    }, () => {
      this.setState({
        priceTypeSelected: 'Select'
      })
    })
  }

  handlePriceChange(e) {
    this.setState({
      priceTypeSelected: e.target.value
    }, () => {
      this.setState({
        priceType: ['low to high', 'high to low']
      })
    });
    if(e.target.value === 'low to high') {
      this.state.items.sort((a,b) => (parseFloat(a.price) - parseFloat(b.price)));
    } else if(e.target.value === 'high to low') {
      this.state.items.sort((a,b) => (parseFloat(b.price) - parseFloat(a.price)));
    }
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
            this.state.items.map((v,i) => {
                return (
                  <Item item={v} key={i} history={this.props}/>
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
