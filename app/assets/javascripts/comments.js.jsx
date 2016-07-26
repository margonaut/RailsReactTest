
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
  render: function() {
    return (
      <div className="CommentBox">
        <CommentList comments={this.state.comments} />
      </div>
    )
  }
});


var ready = function() {
  var fakeComments = [
    { author:"Richard", comment:"This is a comment" },
    { author:"Nils", comment:"This is another comment" }
  ];

  ReactDOM.render(
    <CommentBox url="/comments.json" />,
    document.getElementById('comments')
  )
}

$(document).ready(ready);
