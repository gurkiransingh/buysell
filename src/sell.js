import React from "react";
import Axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-responsive-modal';

class Sell extends React.Component {
  constructor(props) {
    super(props);

    this.finish = React.createRef();
    this.submit = React.createRef();

    this.defaultClothingTypes = [
      {'clothType' :'Denim', 'price':  100, 'quantity': 0},
        {'clothType' :'Tops', 'price':  50, 'quantity': 0},
        {'clothType' :'Ethnic', 'price':  75, 'quantity': 0},
        {'clothType' :'Western', 'price':  50, 'quantity': 0},
        {'clothType' :'Shorts', 'price':  50, 'quantity': 0}
    ]

    this.state = {
      clothingTypes: [
        {'clothType' :'Denim', 'price':  100, 'quantity': 0},
        {'clothType' :'Tops', 'price':  50, 'quantity': 0},
        {'clothType' :'Ethnic', 'price':  75, 'quantity': 0},
        {'clothType' :'Western', 'price':  50, 'quantity': 0},
        {'clothType' :'Shorts', 'price':  50, 'quantity': 0}
      ],
      totalSum: 0,
      sellOrders: [],
      loader: false,
      currentSellOrder: false,
      open: false,
      sellOrderDetail: null 
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.placeSellOrder = this.placeSellOrder.bind(this);
    this.getSellOrders = this.getSellOrders.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  showDetails(id) {
    console.log(id);
    Axios.post('/getSellOrderDetail', {id: id})
      .then((res) => {
        console.log(res);
        this.setState({
          sellOrderDetail: res.data,
          open: true
        })
      })
  }

  onCloseModal (){
    this.setState({ open: false });
    };

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
    this.setState({
      loader: true
    })
    let map = this.state.clothingTypes.filter((v, i) => {
      return delete v.price
    })
    Axios.post('/createSellOrder', {userId: this.props.userId , data: map, thought: this.state.totalSum})
      .then((res) => {
        this.setState({
          loader: false,
          clothingTypes: this.defaultClothingTypes ,
          currentSellOrder: true
        }, () => {
          Array.from(document.getElementsByClassName('sell-inputs')).map((v,i) => v.value = '');
          toast.info('Sell Order placed successfully', {
            position: toast.POSITION.BOTTOM_CENTER
          })
          this.getSellOrders();
        })
      })
  }

  getSellOrders() {
    Axios.post('/getSellOrders', {userId: this.props.userId})
      .then((res) => {
        this.setState({
          sellOrders: res.data
        },  () => {
          console.log(this.state.sellOrders);
        })
      });
  }
  

  componentDidMount() {
    this.submit.current.style.display = 'none';
    this.getSellOrders();
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
      <div className={'sell-container ' + (this.state.loader ? 'fade' : '')}>
      {
        this.state.loader ? (<div className='spinner spinner-1'></div>) : null
      }
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
                className = 'sell-inputs'
                ref={el => this.inputTitle = el}
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
        <div className='sell-orders'>
          <p className='heading'>Past Sell Orders</p>
          {
            this.state.sellOrders.map((v, i) => (<p className='ind-order' onClick={this.showDetails.bind(this, v)} key={i}>{v}</p>))
          }
        </div>
      </div>
      </div>
      <hr />
      <div className='current-status'>
          <p>Current Order</p>
          <p>Total Estimated amount you will be getting : 
            {
              this.state.currentSellOrder ? (<span>Rs {this.state.totalSum}</span>) : (<span> Awaiting order ...</span>)
            }
          </p>
          <p>Status : 
            {
              this.state.currentSellOrder? (<span>Pick-up</span>) : (<span> Awaiting order ...</span>)
            }
          </p>
        </div>
        <hr />
      <div className='notes'>
      <h3>Note :</h3>
      <p>The price for the clothes in 'other' type cannot be determined before quality check</p>
      <p>The actual total amount and the estimated amount may vary as need to make sure the clothes meet our minimum quality standards</p>
      </div>

      <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <div className='sell-modal'>
            <div className='order'>
            <span>Type</span><span>Quantity</span>
              {
                this.state.sellOrderDetail ? 
                (this.state.sellOrderDetail.data.map((v,i) => {
                  return (
                    <div key={i}>
                      <span>{v.clothType}</span><span>{v.quantity}</span>
                      </div>
                  )
                })) : null
              }
            </div>
            <div className='thought'>
              <span>You thought</span>{this.state.sellOrderDetail? (<span>{this.state.sellOrderDetail.thought}</span>) : (null)}
            </div>
            <div className='got'>
              <span>You got</span>{this.state.sellOrderDetail? (<span>{this.state.sellOrderDetail.got}</span>) : (null)}
            </div>
            </div>
      </Modal>

      </div>
    );
  }
}

export default Sell;
