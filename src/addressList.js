import React from "react";

function AddressList(props) {
  let current = props.currentIndex === props.index;
  let width = {
      width: '90%'
  }
  let answer = {
      marginLeft: '2em',
      cursor: 'pointer'
  }
  let span = {
    float: 'right'
  }

  return (
    <ul className="holder" style={width}>
      <li
        className="question"
        style={{
          backgroundColor: current && "#00d782bf"
        }}
        onClick={() => props.handleChange(props.index)}
      >
        {props.header}

        {
          props.default ? (<span style={span}>Default</span>) : (
            <span 
              onClick={() => props.makeDefault(props.index)}
              style={span}>
               Make Default
            </span>
            )
        }
      </li>
      <div className={current ? "answer open" : "answer"}>
        {
            current && <div><p>{`${props.firstname} ${props.lastname} ${props.addr1} ${props.addr2} ${props.landmark} ${props.city} ${props.state} ${props.zip}`} <i 
            onClick={() => props.onOpenModal({
              fName: props.firstname,
              lName: props.lastname,
              addr1: props.addr1,
              addr2: props.addr2,
              landmark: props.landmark,
              city: props.city,
              state: props.state,
              zip: props.zip,
              index: props.index,
              default: props.default
            })}
              style={answer}  className="fa fa-box" aria-hidden="true"></i>
            </p>
            </div>
        }
      </div>
    </ul>
  );
}

export default AddressList;