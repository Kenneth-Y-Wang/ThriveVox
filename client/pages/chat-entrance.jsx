import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class ChatEntrance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ room: event.target.value });

  }

  handleSubmit(event) {
    event.preventDefault();
    const roomName = this.state.room;

    window.location.hash = `#chatRoom?roomName=${roomName}`;
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
      <div className="chat-entrance-page">

        <div className="join-container col-half">
          <header className="join-header">
            <h1>ThriveVox.Chat</h1>
          </header>
          <div className="join-form-holder">
            <form onSubmit={this.handleSubmit}>
              <div className="form-section">
                <label>Username</label>
                <h4>{this.context.user.username}</h4>
              </div>
              <div className="form-section">
                <label htmlFor="room">Topic Room</label>
                <select onChange={this.handleChange} name="room" id="room">
                  <option>Please Choose One Topic Room to Start Chatting..</option>
                  <option value="Wanna Join?">Wanna Join?</option>
                  <option value="Tell me Your Favorite!">Tell me Your Favorite!</option>
                  <option value="What's Next?">What&apos;s Next?</option>
                  <option value="Let's Chat!">Let&apos;s Chat!</option>
                  <option value="Do You Know?">Do You Know?</option>
                </select>
              </div>
              <button type="submit" className="join-button">Join Chat</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

ChatEntrance.contextType = AppContext;
