var React = require('react');
var Comment = React.createClass({
  handleDelete: function() {
    this.props.onDelete(this.props.key);
  },
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});

module.exports = Comment;