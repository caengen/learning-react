var React = require('react');

var LoginForm = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text"></input>
        <input type="text"></input>
        <button type="submit"></button>
      </form>
    );
  }
});

module.exports = LoginForm;
