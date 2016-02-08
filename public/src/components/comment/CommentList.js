import React from 'react';
import autobind from 'autobind-decorator';
import Comment from './Comment';

@autobind
export default class CommentList extends React.Component {
  handleDelete(key) {
    if (!key) {
      return;
    }

    this.props.onCommentDelete(key);
  }

  render() {
    if (!this.props.isOpen) return null;

    var commentNodes = this.props.data.map(function (comment) {
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
};
