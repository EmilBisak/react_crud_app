import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { HashRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
