import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer>
        {/* <span className='footer-link' onClick={()=>this.props.changePage('home')}>Home</span> */}
        <span className="footer-link">
          <a href="mailto:olga.jackson@lymphcon.ch" target="_blank">
            Contact
          </a>
        </span>
        {/* <span className='footer-link'><a href='#' target="_blank">Terms of service</a></span>
      <span className='footer-link'><a href='#' target="_blank">Privacy policy</a></span> */}
        <span className="footer-copyright">Copyright © 2019 Fondazione IOR. All Rights Reserved</span>
      </footer>
    );
  }
}

export default Footer;
