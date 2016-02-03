(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var CommentBox = React.createClass({
  displayName: 'CommentBox',

  loadCommentsFromServer: function loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function handleCommentSubmit(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({ data: comments });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'commentBox' },
      React.createElement(
        'h1',
        null,
        'Comments'
      ),
      React.createElement(CommentList, { url: this.props.url, data: this.state.data }),
      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }
});

var CommentList = React.createClass({
  displayName: 'CommentList',

  handleCommentDelete: function handleCommentDelete(key) {
    for (var i = 0; i < this.props.data; i++) {
      if (this.props.data[i].id === key) {
        this.setState({ data: this.props.data.slice(i, i + 1) });
        break;
      }
    }
    $.ajax({
      url: this.props.url + '/' + key,
      dataType: 'json',
      type: 'DELETE',
      success: function () {
        console.log(key + ' is deleted');
      }.bind(this),
      error: function () {
        console.error(key + ' has err on delete');
      }.bind(this)
    });
  },

  render: function render() {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(
        Comment,
        { author: comment.author, key: comment.id, onCommentDelete: this.handleCommentDelete.bind(this, comment.id) },
        comment.text
      );
    }, this);

    return React.createElement(
      'section',
      { className: 'commentList' },
      commentNodes
    );
  }
});

var CommentForm = React.createClass({
  displayName: 'CommentForm',

  getInitialState: function getInitialState() {
    return {
      author: '',
      text: ''
    };
  },
  handleAuthorChange: function handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  },
  handleTextChange: function handleTextChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  },
  render: function render() {
    return React.createElement(
      'form',
      { className: 'commentForm', onSubmit: this.handleSubmit },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Your name',
        value: this.state.author,
        onChange: this.handleAuthorChange
      }),
      React.createElement('input', {
        type: 'text',
        placeholder: 'Write a message',
        value: this.state.text,
        onChange: this.handleTextChange
      }),
      React.createElement(
        'button',
        { type: 'submit' },
        'Post'
      )
    );
  }
});

var Comment = React.createClass({
  displayName: 'Comment',

  handleDelete: function handleDelete() {
    this.props.onCommentDelete(this.props.key);
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'comment' },
      React.createElement(
        'h2',
        { className: 'commentAuthor' },
        this.props.author
      ),
      React.createElement('span', { dangerouslySetInnerHTML: this.rawMarkup() }),
      React.createElement(
        'button',
        { onClick: this.handleDelete },
        'Delete'
      )
    );
  }
});

ReactDOM.render(React.createElement(CommentBox, { url: '/api/comments', pollInterval: 2000 }), document.getElementById('content'));

},{}]},{},[1]);
