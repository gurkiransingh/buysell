import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="profile-container">
        <div className='welcome'>
            <p>Welcome username</p>
        </div>
        <div className='main-body'>
        <div className='profile'>
          <p><i class="fas fa-signature"></i>John Doe</p>
          <p><i class="fas fa-location-arrow"></i>111 Canal Street, NY , 11022</p>
          <p><i class="fas fa-at"></i>johndoe@doe.com</p>
          <p><i class="fas fa-phone-volume"></i>9898981234</p>
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