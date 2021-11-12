import React from 'react';
import AppContext from '../lib/app-context';

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
    console.log(this.state.input);
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
