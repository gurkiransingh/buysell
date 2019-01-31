import React from "react";

class Process extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="process-container">
      <div>
      This page will have the flows <br />
        1. Sell flow <br />
        2. Buy flow <br /> <br />
        Will ask customers to chose a flow by clicking on it, and then have a
        separate page for them
      </div>
      </div>
    );
  }
}

export default Process;
