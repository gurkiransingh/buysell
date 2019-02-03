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
        <div className='profile'></div>
        <div className='separator'></div>
        <div className='stats'>
          <div>
            <p>0</p>
            <p>Points</p>
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
