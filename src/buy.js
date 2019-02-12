import React from "react";
import Item from './item';

class Buy extends React.Component {
  constructor(props) {
    super(props);


    console.log(this.props);
    
    this.state = {
      clothType: ['Featured', 'denim', 'western', 'Ethnic', 'tops', 'shorts'],
      clothTypeSelected: 'Featured',
      priceType: ['Select', 'low to high', 'high to low'],
      priceTypeSelected: 'Select',
      items : [
        {
          pic: 'https://picsum.photos/200/300',
          type: 'denim',
          name: 'Roadster',
          desc: 'Men striped sweater',
          price: 200,
          size: ['M', 'L']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'Ethnic',
          name: 'rogue',
          desc: 'Women striped sweater',
          price: 300,
          size: ['S']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'Western',
          name: 'rogue',
          desc: 'Women striped sweater',
          price: 100,
          size: ['S']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'Western',
          name: 'rogue',
          desc: 'Women striped sweater',
          price: 500,
          size: ['S']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'denim',
          name: 'Roadster',
          desc: 'Men striped sweater',
          price: 1200,
          size: ['M', 'L']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'denim',
          name: 'Roadster',
          desc: 'Men striped sweater',
          price: 900,
          size: ['M', 'L']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'denim',
          name: 'Roadster',
          desc: 'Men striped sweater',
          price: 2000,
          size: ['M', 'L']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'tops',
          name: 'Roadster',
          desc: 'Men striped sweater',
          price: 700,
          size: ['M', 'L']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'shorts',
          name: 'Roadster',
          desc: 'Men striped sweater',
          price: 1500,
          size: ['M', 'L']
        },
        {
          pic: 'https://picsum.photos/200/300',
          type: 'tops',
          name: 'Roadster',
          desc: 'Men striped sweater',
          price: 1100,
          size: ['M', 'L']
        }
      ]
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);

    this.originalItems  = [
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 200,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'Ethnic',
        name: 'rogue',
        desc: 'Women striped sweater',
        price: 300,
        size: ['S']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'Western',
        name: 'rogue',
        desc: 'Women striped sweater',
        price: 100,
        size: ['S']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'Western',
        name: 'rogue',
        desc: 'Women striped sweater',
        price: 500,
        size: ['S']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1200,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 900,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'denim',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 2000,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'tops',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 700,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'shorts',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1500,
        size: ['M', 'L']
      },
      {
        pic: 'https://picsum.photos/200/300',
        type: 'tops',
        name: 'Roadster',
        desc: 'Men striped sweater',
        price: 1100,
        size: ['M', 'L']
      }
    ]
  }

  componentDidMount() {
    console.log(this.props.history);
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
              // if(v.type.toLowerCase() === this.state.clothTypeSelected.toLowerCase() || this.state.clothTypeSelected === 'Featured') {
                return (
                  <Item item={v} key={i} history={this.props}/>
                )
              // } else {
              //   return null;
              // }
            })
          }
          {/* {
            this.items.map((v,i) => {
              console.log(v.type, this.state.clothTypeSelected)
              if(v.type.toLowerCase() === this.state.clothTypeSelected.toLowerCase() || this.state.clothTypeSelected === 'Featured') {
                return (
                  <Item item={v} key={i} history={this.props}/>
                )
              } else {
                return null;
              }
            })
          } */}
            </div>
        </div>
      </div>
    );
  }
}

export default Buy;
