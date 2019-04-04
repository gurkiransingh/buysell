import React from "react";

function ItemsList(props) {
  let current = props.currentIndex === props.index;

  return (
    <ul className="holder">
      <div
        className="question"
        style={{
          backgroundColor: current && "#00d782bf"
        }}
        onClick={() => props.handleChange(props.index)}
      >
        <span>{props.question}</span>
        {
          props.answer.returned ? (<button>Already Returned</button>) : ( <button onClick={() => props.handleSelect(props.answer._id)}>Initiate Return</button>)
        }
      </div>
      <div className={current ? "answer open" : "answer"}>
        {current && 
            <div className='desc'>
                <p className='name'>{props.answer.name}</p>
                <p className='des'>{props.answer.desc}</p>
                <p className='price'>Price: <span>{props.answer.price}</span></p>
            </div>
        }
      </div>
    </ul>
  );
}

export default ItemsList;
