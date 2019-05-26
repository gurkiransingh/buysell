import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="social">
          <div>
            <p>
              <i className="fab fa-facebook-f" />
            </p>
            <p>
              <i className="fab fa-instagram" />
            </p>
            <p>
              <i className="fab fa-twitter" />
            </p>
          </div>
        </div>
        <div className="info">
          <div className="info-wrapper">
            <div className="text">
              <p>Lorem Ipsum</p>
              <p>
                Lorem ipsum dolor sit amet, ei nam audire omittam, id dictas
                convenire quo, fugit eligendi ad mei. Qui in quem primis. Qui
                elit soluta eu, in sale cetero aeterno eos. Nemore latine in nec
              </p>
            </div>
            <div className="contact-us">
              <p>Contact us</p>
              <div>
                <p>
                  <i className="fa fa-phone" />
                  +919999999999
                </p>
                <p>
                  <i className="fa fa-at" />
                  example@example.com
                </p>
              </div>
            </div>
            <div className="work">
              <p>Work with us</p>
              <div>
                <p>Wanna collaborate ?</p>
                <p>Click here</p>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>
            <span>Copyright 2019</span>
            <span>All rights reserved</span>
            <span>Terms and conditions</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
