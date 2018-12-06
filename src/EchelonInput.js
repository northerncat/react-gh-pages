import React, { Component } from 'react';
import './bootstrap.min.css';

class EchelonInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      echelon: 200
    };
  }

  onInputChange() {
    return event => {
      const echelon = parseInt(event.nativeEvent.data);
      if (!isNaN(echelon)) {
        this.setState({ echelon: echelon });
      }
    }
  }

  render() {
    return (
      <div className="col-md-12 ml-sm-auto col-lg-12 px-4">
        <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
          <h3>梯次</h3>
        </main>
        <div className="input-group mb-3 col-md-8 mx-auto">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">梯次</span>
          </div>
          <input type="text" onChange={this.onInputChange().bind(this)} className="form-control" placeholder={this.state.echelon}/>
          <div className="input-group-append">
            <span className="input-group-text">T</span>
          </div>
        </div>
      </div>
    );
  }
}

export default EchelonInput;
