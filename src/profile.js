import React from "react";
import Axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName : '',
      lastName: '',
      email: '',
      number: '',
      orders: 0,
      username: '',
      loader: false
    }
  }

  componentDidMount() {
    this.setState({
      loader: true
    })
    Axios.post('/getUserDetails', { userId: this.props.userId})
      .then((res) => {
        this.setState({
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          orders: res.data.orders.length,
          username: res.data.username,
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
          <p><i className="fas fa-location-arrow"></i>111 Canal Street, NY , 11022</p>
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