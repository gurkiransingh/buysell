import React from "react";
import moment from 'moment';

function OrdersList(props) {
  let current = props.currentIndex === props.index;

  let textarea = {
      width: '100%'
  }

  let float = {
    float: 'right'
  }

  return (
    <ul className="holder">
      <li
        className="question"
        style={{
          backgroundColor: current && "#00d782bf"
        }}
        onClick={() => props.handleChange(props.index)}
      >
        <span>{props.question} </span><span style={float}>{moment(props.date).format('DD-MM-YYYY')}</span>
      </li>
      <li className={current ? "answer open" : "answer"}>
        {current && (
            <div className='order-details'>
                <button onClick={() => props.showDetailsModal(props)}>Click for Details</button>
                <div className='form'>
                    <p>Provide feedback</p>
                    <textarea style={textarea} rows='5'></textarea>
                    <button>Submit</button>
                </div>
            </div>
        )}
      </li>
    </ul>
  );
}

export default OrdersList;
