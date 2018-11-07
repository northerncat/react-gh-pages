import React, { Component } from 'react';
import './bootstrap.min.css';

class EchelonInput extends Component {
  render() {
    return (
      <div className="col-md-12 ml-sm-auto col-lg-12 px-4">
        <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
          <h3>梯次</h3>
        </main>
        <div className="input-group mb-3 col-md-10 mx-auto">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">梯次</span>
          </div>
          <input type="text" className="form-control" placeholder="195T"/>
        </div>
      </div>
    );
  }
}

export default EchelonInput;
