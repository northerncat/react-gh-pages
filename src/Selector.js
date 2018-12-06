import React, { Component } from 'react';

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            selected: null
        };
    }

    onChange = event => {
        this.setState({ selected: event.target.value});
    }

    render() {
        return (
            <select className="col-md-6" onChange={this.onChange}>
                {this.state.options.map(org => <option key={org} value={org}>{org}</option>)}
            </select>
        );
    }
}

export default Selector;