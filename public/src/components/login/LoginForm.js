var React = require('react');

var LoginForm = React.createClass({
  render: function() {
    return (
      <form className="loginForm">
        <label for="loginEmail">Email Address</label>
        <input id="loginEmail" type="text" />
        <label for="loginPassword">Password</label>
        <input id="loginPassword" type="text" />
        <button type="submit">Sign in</button>
      </form>
    );
  }
});

module.exports = LoginForm;
