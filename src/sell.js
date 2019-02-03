import React from "react";
import SellForm from './sell-form';

class Sell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clothingTypes: [
        {'clothType' :'Denim', 'price':  100, 'quantity': 1},
        {'clothType' :'Tops', 'price':  50, 'quantity': 1},
        {'clothType' :'Ethnic', 'price':  75, 'quantity': 1},
        {'clothType' :'Western', 'price':  50, 'quantity': 1},
        {'clothType' :'Shorts', 'price':  50, 'quantity': 1}
      ]
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount() {
  }

  handleInputChange(e,clothType) {
  let quantityNumber = e.target.value; 
   this.setState(prevState => ({
    clothingTypes: prevState.clothingTypes.map(
        obj => (obj['clothType'] === clothType ? Object.assign(obj, { quantity: quantityNumber}): obj)
    )
   }));
  }

  render() {
    return (
      <div className="sell-flow">
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
              <input type="number" name="quantity" min="1" max="25" onChange = { (e) => this.handleInputChange(e, v['clothType'])}/>
              <p>Rs. {
                Number(v['price']) * Number(v['quantity'])
                }</p>
            </div>
          )
        })
      }
      </div>
    );
  }
}

export default Sell;
