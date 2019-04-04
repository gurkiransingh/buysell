import React from "react";
import Axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addr1: '',
      addr2: '',
      landmark: '',
      city: '',
      state: '',
      zip: '',
      firstName : '',
      lastName: '',
      email: '',
      number: '',
      orders: 0,
      username: '',
      loader: false
    }

    this.redirectToInfo = this.redirectToInfo.bind(this);
  }

  redirectToInfo() {
    this.props.history.push(`${this.props.match.url}/updateInfo`)
  }

  componentDidMount() {
    this.setState({
      loader: true
    })
    Axios.post('/getDefaultAddress', { userId: this.props.userId})
      .then((res) => {
        this.setState({
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          orders: res.data.orders.length,
          username: res.data.username,
          addr1: res.data.addresses[0] ? res.data.addresses[0].addr1 : '',
          addr2: res.data.addresses[0] ? res.data.addresses[0].addr2 : '',
          landmark: res.data.addresses[0] ? res.data.addresses[0].landmark : '',
          city: res.data.addresses[0] ? res.data.addresses[0].city : '',
          state: res.data.addresses[0] ? res.data.addresses[0].state : '',
          zip: res.data.addresses[0] ? res.data.addresses[0].zip : '',
          loader: false
        })
      })
  }

  render() {
    return (
      <div className={"profile-container " + (this.state.loader ? 'fade': '')}>
       {
        this.state.loader ? (<div className='spinner spinner-1'></div>) : null
      }
        <div className='welcome'>
            <p>Welcome {this.state.username}</p>
        </div>
        <div className='main-body'>
        <div className='profile'>
          <p><i className="fas fa-signature"></i>{`${this.state.lastName}, ${this.state.firstName}`}</p>
          <p><i className="fas fa-location-arrow"></i>
          {
            this.state.addr1 !== '' ? (`${this.state.addr1} ,${this.state.addr2} ,${this.state.landmark} ,${this.state.city} ,${this.state.state} ,${this.state.zip}`) : 
              (<button onClick={this.redirectToInfo}>Enter Mailing Address</button>)
            }
          </p>
          <p><i className="fas fa-at"></i>{this.state.email}</p>
          <p><i className="fas fa-phone-volume"></i>9898981234</p>
        </div>
        <div className='separator'></div>
        <div className='stats'>
          <div>
            <p><i className="fas fa-rupee-sign">999</i></p>
            <p>Earned</p>
          </div>
          <div>
            <p>{this.state.orders}</p>
            <p>Orders</p>
          </div>
          <div>
            <p>0</p>
            <p>Returns</p>
          </div>
          <div>
             <p>0</p>
            <p>Something</p>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Profile;