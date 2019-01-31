import React from "react";

class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="contact-container">
        <div className='container'>
        <div className='title'>
        <p className='title-deco'></p><span>Contact Us</span><p className='title-deco'></p>
      </div>
          <div className='desc'>Email us with any questions or enquiries or call 99999-99999. We would be happy to answer your questions and set up a meeting with you. Cieux porteurs aux les moi plus bleu les toute qui frissons. La figements flammes aux jaune un j'ai l'amour regrette,.</div>
          <div className='form'>
          <div className='pair'>
          <label htmlFor="name">
              <span>Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="name"
                onChange={this.name}
                required
              />
          </div>
          <div className='pair'>
          <label htmlFor="email">
          <span>Email</span>
              </label>
              <input
                id="email"
                type="text"
                placeholder="example@domain.com"
                onChange={this.email}
                required
              />
          </div>
            <div className='pair'>
            <label htmlFor="subject">
            <span>Subject</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder="example@domain.com"
                onChange={this.email}
                required
              />
            </div>
           <div className='pair'>
           <label htmlFor="message" className='text-area'>
           <span>Message</span>
              </label>
              <textarea
                id="message"
                type="text"
                placeholder=""
                onChange={this.message}
                required
              />
           </div>
           <div className='pair'>
            <button><span>Send Email</span></button>
           </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
