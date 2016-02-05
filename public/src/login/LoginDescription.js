var React = require('react');

var LoginDescription = React.createClass({
  render: function() {
    return (
      <section>
        <LoginImage />
        <h1>Hello</h1>
        <p>world!</p>
      </section>
    );
  }
});

var LoginImage = require('./LoginImage');

module.exports = LoginDescription;
