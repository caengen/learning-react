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
        <section>
          <button onClick={this.handleDelete}>
            <img src="../../../vectors/ic_clear_black_24px.svg"></img>
          </button>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </section>
        <small className="commentAuthor">
          {this.props.author}
        </small>
      </div>
    );
  }
});

module.exports = Comment;
