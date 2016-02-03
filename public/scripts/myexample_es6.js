class ReactBase extends React.Component {
  _bind(...methods) {
    methods.forEach(  (method) => this[method] = this[method].bind(this));
  }
}

class CommentBox extends ReactBase {
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
  
  handleCommentSubmit() {
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
  
  constructor() {
    super();
    this._bind('loadCommentsFromServer', 'handleCommentSubmit');
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  
  this.state = {data: []}
  
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList url={this.props.url} data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

class CommentList extends ReactBase {
  constructor() {
    super();
    this._bind('handleCommentDelete');
  }
  
  handleCommentDelete() {
    for (var i = 0; i < this.props.data; i++) {
      if (this.props.data[i].id === key) {
        this.setState({data: this.props.data.slice(i, i+1)});
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
  
  render() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id} onCommentDelete={this.handleCommentDelete.bind(this, comment.id)}>
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
}

class CommentForm extends ReactBase {
  constructor() {
    super();
    this.bind('handleAuthorChange', 'handleTextChange', 'handleSubmit');
  }
  
  this.state = {author: '', text: ''}
  
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }
  
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text:''});
  }
  
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input 
          type="text" 
          placeholder="Write a message"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}

class Comment extends React.Component {
  constructor() {
    super();
    this._bind('handleDelete', 'rawMarkup')
  }
  
  handleDelete() {
    this.props.onCommentDelete(this.props.key);
  }
  
  rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  }
  
  render() {
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
}

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);