import React from "react";
import Axios from 'axios';

class Sell extends React.Component {
  constructor(props) {
    super(props);

    this.finish = React.createRef();
    this.submit = React.createRef();

    this.state = {
      clothingTypes: [
        {'clothType' :'Denim', 'price':  100, 'quantity': 0},
        {'clothType' :'Tops', 'price':  50, 'quantity': 0},
        {'clothType' :'Ethnic', 'price':  75, 'quantity': 0},
        {'clothType' :'Western', 'price':  50, 'quantity': 0},
        {'clothType' :'Shorts', 'price':  50, 'quantity': 0}
      ],
      totalSum: 0,
      sellOrders: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.placeSellOrder = this.placeSellOrder.bind(this);
    this.checkauth = this.checkauth.bind(this);

  }

  handleSubmit() {
    let totalSum = 0;
    this.state.clothingTypes.map((v) => {
      totalSum = totalSum + (+(v['price'] * +v['quantity']));
    })
    this.setState({
      totalSum
    })
    this.finish.current.style.display = 'none';
    this.submit.current.style.display = 'block';
  }

  placeSellOrder() {
    let self = this;
    let map = this.state.clothingTypes.filter((v, i) => {
      return delete v.price
    })
    Axios.post('/createSellOrder', {userId: this.props.userId , data: map, thought: this.state.totalSum})
      .then(function(res) {
        console.log(res.data);
      })
  }


  componentDidMount() {
    let self = this;
    this.submit.current.style.display = 'none';
    Axios.post('/getSellOrders', {userId: this.props.userId})
      .then(function(res) {
        self.setState({
          sellOrders: res.data
        })
      });
  }

  handleInputChange(e,clothType) {
  let quantityNumber = e.target.value; 
   this.setState(prevState => ({
    clothingTypes: prevState.clothingTypes.map(
        obj => (obj['clothType'] === clothType ? Object.assign(obj, { quantity: quantityNumber}): obj)
    )
   }));
  }

  handleInputFocus() {
    this.submit.current.style.display = 'none';
    this.finish.current.style.display = 'block';
  }

  render() {
    return (
      <div className='sell-container'>
         <div className="sell-flow">
      <div className='sell-flow-container'>
        <div className='header'>
          <p>Type</p>
          <p>How Many?</p>
          <p>Approx money </p>
        </div>
      {
        this.state.clothingTypes.map((v, i) => {
          return (
            <div key={i} className='header'>
              <p>{v['clothType']}:</p>
              <input 
                type="number" 
                name="quantity" 
                min="0" max="25" 
                onChange = { (e) => this.handleInputChange(e, v['clothType'])}
                onFocus = {this.handleInputFocus}
                />
              <p>Rs. {
                Number(v['price']) * Number(v['quantity'])
                }</p>
            </div>
          )
        })
      }
      <div className='header other'>
      <p>Other</p>
      <input type="number" name="quantity" min="1" max="25" />
      <p></p>
      </div>
      <div className='submit-sell'>
        <p ref={this.submit} onClick={this.placeSellOrder}>Place pick-up request</p>
        <p ref={this.finish} onClick={this.handleSubmit}>Click when finish adding</p>
      </div>
      </div>
      <div className='separator'></div>
      <div className='info'>
        <div>
          <p>Total Estimated amount you will be getting : <span>Rs {this.state.totalSum}</span></p>
          <p>Estimated time for pick-up : <span>2.5 hours</span></p>
          <p>Status : Pick-up</p>
        </div>
        <div className='separator'></div>
        <div className='sell-orders'>
          <p className='heading'>Past Sell Orders</p>
          {
            this.state.sellOrders.map((v, i) => (<p key={i}>{v}</p>))
          }
        </div>
      </div>
      </div>
      <hr />
      <div className='notes'>
      <h3>Note :</h3>
      <p>The price for the clothes in 'other' type cannot be determined before quality check</p>
      <p>The actual total amount and the estimated amount may vary as need to make sure the clothes meet our minimum quality standards</p>
      </div>
      <button onClick={this.checkauth}>click</button>
      </div>
    );
  }
}

export default Sell;
