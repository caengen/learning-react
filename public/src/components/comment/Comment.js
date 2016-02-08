/* use 'esversion': 6 */
import React from 'react'
import autobind from 'autobind-decorator'

@autobind
export default class Comment extends React.Component {
  handleDelete() {
    this.props.onDelete(this.props.key);
  }

  rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
    return { __html: rawMarkup };
  }

  render() {
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
};
