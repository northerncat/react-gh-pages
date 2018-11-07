import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopNavigator from './TopNavigator';
import EchelonInput from './EchelonInput';
import DistributionTable from './DistributionTable';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TopNavigator />, document.getElementById('top_navigator'));
ReactDOM.render(<EchelonInput />, document.getElementById('echelon_input'));
ReactDOM.render(
	(

        <div className="col-md-12 ml-sm-auto col-lg-12 px-4">
            <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
                <h3>家庭因素（返家住宿）</h3>
            </main>
            <div>
                <DistributionTable />
            </div>
        </div>
    ),
	document.getElementById('home_coming'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
