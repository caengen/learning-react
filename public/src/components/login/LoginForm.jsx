var React = require('react');

var LoginForm = React.createClass({
  handleEmailChange: function (e) {
    this.setState({ emailAddress: e.target.value });
  },

  handlePasswordChange: function (e) {
    this.setState({ password: e.target.value });
  },

  handleSubmit: function () {
    var emailAddress = this.state.emailAddress.trim();
    var password = this.state.password.trim();

    if (!emailAddress || !password) {
      return;
    }

    this.props.onLoginSubmit({ emailAddress: emailAddress, password: password });
    this.setState({ password: '' });
  },

  getInitialState: function () {
    return {
      emailAddress: '',
      password: '',
    };
  },

  render: function () {
    return (
      <form className="loginForm">
        <label for="loginEmail">Email Address</label>
        <input onChange={this.handleEmailChange} value={this.state.emailAddress} id="loginEmail" type="email" />
        <label for="loginPassword">Password</label>
        <input onChange={this.handlePasswordChange} value={this.state.password} id="loginPassword" type="password" />
        <button type="submit">Sign in</button>
      </form>
    );
  },
});

module.exports = LoginForm;
