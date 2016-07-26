
var Comment = React.createClass({
  render: function() {
    return (
      <div className="Comment">
        <h4>{this.props.author}</h4>
        {this.props.comment}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.comments.map(function(comment, index) {
      return (
        <Comment author={comment.author} comment={comment.comment} key={index}></Comment>
      )
    });
    return (
      <div className="CommentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {comments: []}
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {'comment': comment},
      success: function(data) {
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="CommentBox">
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList comments={this.state.comments} />
      </div>
    )
  }
});

var CommentForm = React.createClass({displayName: 'CommentForm',
      getInitialState: function() {
        return { author: '', comment: '' };
      },
      handleAuthorChange: function(e) {
        // called when the corresponding input value is changed. The event
        // containing the new data is passed in and used to update the value
        // in the state
        this.setState({author: e.target.value});
      },
      handleTextChange: function(e) {
        this.setState({comment: e.target.value});
      },
      handleSubmit: function(e) {
        // Prevent the page from refreshing
        e.preventDefault();
        var author = this.state.author.trim();
        var comment = this.state.comment.trim();
        // If the author or comment value isn't present, return out of the method
        // and do nothing
        if (!comment || !author) {
          return;
        }
        // activate function passed down from parent for this purpose
        this.props.onCommentSubmit({author: author, comment: comment});


        // And reset the form placeholder values.
        // not working for some reason
        // this.setState({author: '', comment: ''});
      },
      render: function() {
        // When the value of this input is changed, call the method
        // that sets that value in the component state
        // onChange is a react event handler
        return (
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder={this.state.author}
              onChange={this.handleAuthorChange}
            />
            <input
              type="text"
              placeholder={this.state.comment}
              onChange={this.handleTextChange}
            />
            <input type="submit" value="Post" />
          </form>
        )
      }
    });


var ready = function() {

  ReactDOM.render(
    <CommentBox url="/comments.json" />,
    document.getElementById('comments')
  )
}

$(document).ready(ready);
