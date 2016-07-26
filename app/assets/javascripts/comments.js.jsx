
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


var ready = function() {
  var fakeComments = [
    { author:"Richard", comment:"This is a comment" },
    { author:"Nils", comment:"This is another comment" }
  ];

  ReactDOM.render(
    <CommentList comments={fakeComments} />,
    document.getElementById('comments')
  )
}

$(document).ready(ready);
