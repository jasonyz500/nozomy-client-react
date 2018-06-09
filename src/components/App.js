import React, { Component } from 'react';
import Main from './main';
import Login from './login/';
import AuthService from './auth-service';

const authService = new AuthService();

class App extends Component {
  render() {
    let mainTag;
    if (authService.isLoggedIn()) {
      mainTag = <Main />;
    } else {
      mainTag = <Login />;
    }
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>
        {mainTag}
      </div>
    );
  }
}

export default App
