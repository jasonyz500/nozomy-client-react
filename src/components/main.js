import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './navigation'
import Login from './login/';
import Home from './home/';
import Entry from './entry/';
import Visualize from './visualize/';

const Main = () => (
  <main>
    <Navigation />
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/entries/new' component={Entry}/>
      <Route path='/entries/:id' component={Entry}/>
      <Route path='/visualize' component={Visualize}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main