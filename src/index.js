import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import wjs from './library/wjs';
import App from './App';
import Home from './views/Home/index';
import TransitPage from './components/TransitPage/Transition';
import './index.css';
import './manage.css';
import 'antd/dist/antd.css';
const history = createBrowserHistory();
wjs.sso.refresh();
ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/app' component={App} />
            <Route path='/transit' component={TransitPage} />
        </Switch>
    </Router>
,document.getElementById('root')
);
