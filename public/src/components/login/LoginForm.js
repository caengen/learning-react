import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      emailAddress: '',
      password: '',
    }
  }

  handleEmailChange(e) {
    this.setState({ emailAddress: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit() {
    var emailAddress = this.state.emailAddress.trim();
    var password = this.state.password.trim();

    if (!emailAddress || !password) {
      return;
    }

    this.props.onLoginSubmit({ emailAddress: emailAddress, password: password });
    this.setState({ password: '' });
  }

  render() {
    return (
      <form className="loginForm">
        <label htmlFor="loginEmail">Email Address</label>
        <input onChange={this.handleEmailChange} value={this.state.emailAddress} id="loginEmail" type="email" />
        <label htmlFor="loginPassword">Password</label>
        <input onChange={this.handlePasswordChange} value={this.state.password} id="loginPassword" type="password" />
        <button type="submit">Sign in</button>
      </form>
    );
  }
};
