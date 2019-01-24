import React from "react";

class Process extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="process-container">
        This page will have 3 flows <br />
        1. Redesign flow <br />
        2. Give away flow <br />
        3. Buy flow <br /> <br />
        Will ask customers to chose a flow by clicking on it, and then have a
        separate page for each 3 of them
      </div>
    );
  }
}

export default Process;
