import React from "react";
import Axios from 'axios';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email : {
        sender: '',
        subject: '',
        text: '',
        name: ''
      }
    }

    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    Axios.post('/contactus', {data: this.state.email})
      .then((res) => {
        console.log(res);
      })
  }

  render() {
    const {email} = this.state
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
                onChange={e => this.setState({ email:  {...email, name: e.target.value}})}
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
                onChange={e => this.setState({ email:  {...email, sender: e.target.value}})}
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
                placeholder="subject goes here ..."
                onChange={e => this.setState({ email:  {...email, subject: e.target.value}})}
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
                onChange={e => this.setState({ email:  {...email, text: e.target.value}})}
                required
              />
           </div>
           <div className='pair'>
            <button onClick={this.sendEmail} ><span>Send Email</span></button>
           </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
