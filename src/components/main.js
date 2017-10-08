import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home/'
import Visualize from './visualize/'
import Root from './root/';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/visualize' component={Visualize}/>
      <Route path='/root' component={Root}/>
      <Route path='/:weekStr' component={Home}/>
    </Switch>
  </main>
)

export default Main