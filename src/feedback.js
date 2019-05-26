import React from "react";
import qas from "./qas";
import List from "./list";

class Feedback extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        currentIndex: -1
        };

    this.handleChange = this.handleChange.bind(this);
}    

  handleChange(i) {
    this.setState({
      currentIndex: i
    });
  };

  render() {
    const { currentIndex } = this.state;

    return (
        <div className='feedback-container'> 
            <div className='title'>
                <p className='title-deco'></p>
                <span>Frequently Asked Questions</span>
                <p className='title-deco'></p>
            </div>
          <div className="accordion">
            {qas.map((e, i) => (
            <List
                question={e.question}
                answer={e.answer}
                handleChange={this.handleChange.bind(this, i)}
                key={i}
                index={i}
                currentIndex={currentIndex}
            />
            ))}
         </div>
        </div>
    );
  }
}

export default Feedback;