import React from "react";
import Axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.pInfo;
  } 


  render() {
    return (
      <div className="profile-container">
        <div className='welcome'>
            <p>Welcome username</p>
        </div>
        <div className='main-body'>
        <div className='profile'>
          <p><i className="fas fa-signature"></i>{`${this.state.firstName} ${this.state.lastName}`}</p>
          <p><i className="fas fa-location-arrow"></i>111 Canal Street, NY , 11022</p>
          <p><i className="fas fa-at"></i>{`${this.state.email}`}</p>
          <p><i className="fas fa-phone-volume"></i>{`${this.state.number}`}</p>
        </div>
        <div className='separator'></div>
        <div className='stats'>
          <div>
            <p><i className="fas fa-rupee-sign">999</i></p>
            <p>Earned</p>
          </div>
          <div>
            <p>0</p>
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
