var React = require('react');

var LoginBox = React.createClass({

  render: function() {
    return (
      <div className="loginBox">
        <LoginDescription />
        <LoginForm />
        <LoginOptions />
      </div>
    )
  }
});

var LoginDescription = require('./LoginDescription');
var LoginForm = require('./LoginForm');
var LoginOptions = require('./LoginOptions');

module.exports = LoginBox;
