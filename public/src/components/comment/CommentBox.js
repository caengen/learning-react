import React from 'react';
import autobind from 'autobind-decorator';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

@autobind
export default class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isOpen: true
    };
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleCommentDelete(key) {
    for (var i = 0; i < this.state.data; i++) {
      if (this.state.data[i].id == key) {
        this.setState({data: this.state.data.splice(i, 1)});
        break;
      }
    }

    $.ajax({
      url: this.props.url + '/' + key,
      dataType: 'json',
      type: 'DELETE',
      success: function() {
        console.log(key + ' is deleted');
      }.bind(this),
      error: function() {
        console.error(key + ' has err on delete');
      }.bind(this)
    });
  }

  toggleCommentBox() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
      <div className="commentBox">
        <h1 onClick={this.toggleCommentBox}>chat</h1>
        <CommentList onCommentDelete={this.handleCommentDelete}
          url={this.props.url}
          data={this.state.data}
          isOpen={this.state.isOpen} />
        <CommentForm
          onCommentSubmit={this.handleCommentSubmit}
          isOpen={this.state.isOpen} />
      </div>
    );
  }
};
