var React = require('react');

var LoginDescription = React.createClass({
  render: function() {
    return (
      <section className="loginDescription">
        <LoginImage />
        <h1>Login</h1>
      </section>
    );
  }
});

var LoginImage = require('./LoginImage');

module.exports = LoginDescription;
