import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import AuthService from '../auth-service';
import './login.css';

const authService = new AuthService();

class Login extends Component {
  componentWillMount(){
    if (authService.isLoggedIn()) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Sign In</h2>
          <form onSubmit={ handleSubmit(this.submit) }>
            <Field name="email"
                  component="input"
                  type="text"
                  placeholder="Email" 
            />
            <Field name="password" 
                  component="input"
                  type="password" 
                  placeholder="Password" 
            />
            <Button type="submit" className="blue">Sign In</Button>
          </form>
        </div>
      </div>
    );
  }

  async submit (values) {
    const res = await authService.login(values.email, values.password);
    if (res) {
      window.location.reload();
    } else {
      this.setState({ error: true });
    }
  }
}

export default reduxForm({
  form: 'login'
})(Login);