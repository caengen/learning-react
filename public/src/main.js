var React = require('react');
var CommentBox = require('./components/CommentBox.js');

React.renderComponent(
<CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);