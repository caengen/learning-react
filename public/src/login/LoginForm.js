var React = require('react');

var LoginForm = React.createClass({
  render: function() {
    return (
      <form>
        <input type="email"></input>
        <input type="password"></input>
        <button type="submit"></button>
      </form>
    );
  }
});

module.exports = LoginForm;
