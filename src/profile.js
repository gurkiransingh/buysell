import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (!this.props.isLogged) {}
  }

  render() {
    return (
      <div className="profile-container">
        <div className='welcome'>
            <p>Welcome username</p>
        </div>
        <div className='main-body'>
        <div className='profile'>
          <p>John Doe</p>
          <p>111 Canal Street, NY , 11022</p>
          <p>johndoe@doe.com</p>
          <p>9898981234</p>
          <p>Joined on "date"</p>
        </div>
        <div className='separator'></div>
        <div className='stats'>
          <div>
            <p>Rs 0</p>
            <p>Money Earned</p>
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
