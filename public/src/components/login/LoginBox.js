var React = require('react');

var LoginBox = React.createClass({

  render: function() {
    return (
      <div className="loginBox">
        <LoginDescription />
        <LoginForm />
      </div>
    )
  }
});

var LoginDescription = require('./LoginDescription');
var LoginForm = require('./LoginForm');

module.exports = LoginBox;
