var React = require('react');
var DOM = require('react-dom');
var CommentBox = require('./components/CommentBox.js');

DOM.render(
<CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
