import React from 'react';
import DOM from 'react-dom';
import CommentBox from './components/comment/CommentBox.js';
import LoginBox from './components/login/LoginBox.js';

DOM.render(
  <LoginBox />,
/*<CommentBox url="/api/comments" pollInterval={2000} />,*/
  document.getElementById('content')
);
