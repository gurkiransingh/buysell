import React from "react";

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
      totalSum: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);

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


  componentDidMount() {
    this.submit.current.style.display = 'none';
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
        <p ref={this.submit}>Place pick-up request</p>
        <p ref={this.finish} onClick={this.handleSubmit}>Click when finish adding</p>
      </div>
      </div>
      <div className='separator'></div>
      <div className='info'>
        <p>Total Estimated amount you will be getting : <span>Rs {this.state.totalSum}</span></p>
        <p>Estimated time for pick-up : <span>2.5 hours</span></p>
        <p>Status : Pick-up</p>
      </div>
      </div>
      <hr />
      <div className='notes'>
      <h3>Note :</h3>
      <p>The price for the clothes in 'other' type cannot be determined before quality check</p>
      <p>The actual total amount and the estimated amount may vary as need to make sure the clothes meet our minimum quality standards</p>
      </div>
      </div>
    );
  }
}

export default Sell;
