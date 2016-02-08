import React from 'react';
import autobind from 'autobind-decorator';
import LoginDescription from './LoginDescription';
import LoginForm from './LoginForm';

@autobind
export default class LoginBox extends React.Component {
  onLoginSubmit() {
  }

  render() {
    return (
      <div className="loginBox">
        <LoginDescription />
        <LoginForm onLoginSubmit={this.onLoginSubmit} />
      </div>
    );
  }
};
