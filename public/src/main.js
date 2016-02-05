var React = require('react');
var DOM = require('react-dom');
var CommentBox = require('./components/comment/CommentBox.js');
var LoginBox = require('./components/login/LoginBox.js');

DOM.render(
  <LoginBox />
/*<CommentBox url="/api/comments" pollInterval={2000} />*/,
  document.getElementById('content')
);
