import React from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

import App from 'containers/App/App.jsx';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';


ReactDOM.render((
    <CookiesProvider>
        <HashRouter>
            <Switch>
                <Route path="/" name="Dashboard" component={App} />
            </Switch>
        </HashRouter>
    </CookiesProvider>
),document.getElementById('root'));
