import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions';

class Login extends Component {
  submit = (values) => {
    this.props.login(values.email, values.password, (resp) => {
      console.log('response:', resp);
      localStorage.setItem('auth_token', resp.data);
    });
  }

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Log In</h2>
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
            <button type="submit" className="blue">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { errorMessage: auth.error };
}

const reduxFormLogin = reduxForm({
  form: 'login'
})(Login);

export default connect(mapStateToProps, { login })(reduxFormLogin);