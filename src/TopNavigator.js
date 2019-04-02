import React, { Component } from 'react';
import './bootstrap.min.css';

class TopNavigator extends Component {
  render() {
    return (
      <div className="text-center">
          <br/>
          <a href="https://www.hwwtc.mohw.gov.tw/">
            <img src={window.location.origin + '/sms-distribution-react-gh-pages/img/nav_top.png'} alt="Top Navigator"></img>
          </a>
          <br/>
      </div>
    );
  }
}

export default TopNavigator;
