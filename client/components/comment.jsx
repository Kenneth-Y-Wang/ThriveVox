import React from 'react';
import AppContext from '../lib/app-context';
import { format } from 'date-fns';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      .then(data => console.log(data))
      .catch(error => {
        console.error('error', error);
      });
    this.setState({ input: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="comment-input" onChange={this.handleChange} type="text" id="comment" name="comment" value={this.state.input}
        placeholder="please enter your comment..."></input>
        <h4 className="recent-comment">Recent Comments:</h4>
        <ul className="comment-list">

        </ul>
      </form>
    );
  }
}
