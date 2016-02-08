import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class CommentForm extends React.Component {
  constructor() {
      super();

      this.state = {
        author: '',
        text: ''
      }
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ text:'' });
  }

  render() {
    if (!this.props.isOpen) return null;

    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <section>
          <input
            type="text"
            placeholder="Your name"
            value={this.state.author}
            onChange={this.handleAuthorChange}
          />
      </section>
      <section>
          <input
            type="text"
            placeholder="Type a message..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
        <button type="submit"><img src="./vectors/ic_send_24px.svg"></img></button>
        </section>
      </form>
    );
  }
};
