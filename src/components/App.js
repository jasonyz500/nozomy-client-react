import React, { Component } from 'react';
import Main from './main';
import Login from './login/';
import AuthService from './auth-service';

const authService = new AuthService();

class App extends Component {
  render() {
    if (authService.isLoggedIn()) {
      return <Main />;
    }
    return <Login />;
  }
}

export default App
