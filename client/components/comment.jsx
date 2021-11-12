import React from 'react';
import AppContext from '../lib/app-context';
import { format } from 'date-fns';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      comments: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    fetch(`/api/comments/allComments/${this.props.postId}`, {
      method: 'GET',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      }

    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ comments: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');
    const newTime = format(new Date(), 'yyyy-MM-dd HH:mm');

    const newComment = {
      content: this.state.input,
      postId: this.props.postId,
      time: newTime
    };
    fetch('/api/comments/create', {
      method: 'POST',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
      .then(response => response.json())
      .then(data => {
        const newSavedComment = {
          commentId: data.commentId,
          content: data.content,
          createdAt: data.createdAt,
          username: this.context.user.username
        };
        this.setState({ comments: this.state.comments.concat(newSavedComment) });
      })
      .catch(error => {
        console.error('error', error);
      });
    this.setState({ input: '' });
  }

  render() {
    const allComments = this.state.comments;
    const commentList = allComments.map(comment => {
      const { commentId, content, createdAt, username } = comment;
      const date = createdAt.slice(0, 10) + ' ' + createdAt.slice(11, 16);

      return (
      <li key={commentId}>{username}<span className="comment-date"> {date}</span> : <span className="comment-detail">{content}</span></li>
      );
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="comment-input" onChange={this.handleChange} type="text" id="comment" name="comment" value={this.state.input}
        placeholder="please enter your comment..."></input>
        <h4 className="recent-comment">Recent Comments:</h4>
        <ul className="comment-list">
         {this.state.comments.length !== 0
           ? commentList
           : <li>No comment for this post...</li>}
        </ul>
      </form>
    );
  }
}

Comment.contextType = AppContext;
