import React from "react";

class HomePage extends React.Component {
  render() {
    return (
      <div className="banner-page">
        <div className="tag-line">
          <div>Tagline Goes here (aspect ratio - 50% )</div>
        </div>
        <div className='inspiration'>
        <div>
           some sustainable inspiration here (aspect ratio - 25% )
        </div>
        </div>
        <div className='what-is-it'>
        <div>
          Here to show what we do (aspect ratio - 50% )<br />
          We will also provide a link to our process here ( which can also be accessed from menu above )
        </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
