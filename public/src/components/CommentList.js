var React = require('react');
var CommentList = React.createClass({
  handleDelete: function(key) {
    if (!key) {
      return;
    }
    
    this.props.onCommentDelete(key);
  },
  
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id} onDelete={this.handleDelete.bind(this, comment.id)}>
          {comment.text}
        </Comment>
      );
    }, this);
    
    return (
      <section className="commentList">
        {commentNodes}
      </section>
    );
  }
});

var Comment = require('./Comment.js');

module.exports = CommentList;