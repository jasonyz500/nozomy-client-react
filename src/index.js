import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Home from './components/home';
import Visualize from './components/visualize';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/visualize" component={Visualize} />
        <Route path="/root" component={App} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
