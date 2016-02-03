var React = require('react');
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
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
  },
  handleCommentSubmit: function(comment) {
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
  },
  handleCommentDelete: function(key) {
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
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList onCommentDelete={this.handleCommentDelete} url={this.props.url} data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = require('./CommentList.js');
var CommentForm = require('./CommentForm.js');

module.exports = CommentBox;