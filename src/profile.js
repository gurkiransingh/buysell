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
        <h1>Hello there guest !</h1>
      </div>
    );
  }
}

export default Profile;
