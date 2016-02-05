var React = require('react');

var LoginBox = React.createClass({
  onLoginSubmit: function () {
  },

  render: function () {
    return (
      <div className="loginBox">
        <LoginDescription />
        <LoginForm onLoginSubmit={this.onLoginSubmit} />
      </div>
    );
  },
});

var LoginDescription = require('./LoginDescription');
var LoginForm = require('./LoginForm');

module.exports = LoginBox;
