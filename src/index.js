import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopNavigator from './TopNavigator';
import * as serviceWorker from './serviceWorker';
import EditableTables from './EditableTables';

ReactDOM.render(<TopNavigator />, document.getElementById('top_navigator'));
ReactDOM.render(<EditableTables />, document.getElementById('editable_tables'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
