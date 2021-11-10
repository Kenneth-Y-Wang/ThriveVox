import React from 'react';
import { io } from 'socket.io-client';
import AppContext from '../lib/app-context';
import ChatMessage from '../components/chat-message';
import { format } from 'date-fns';

export default class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMsg: [],
      users: [],
      input: '',
      typingMsg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleType = this.handleType.bind(this);
    this.textBox = React.createRef();
  }

  componentDidMount() {
    const username = this.context.user.username;
    this.socket = io({ query: `roomName=${this.props.roomName}` });
    this.socket.emit('joinRoom', { username });
    this.socket.on('roomUsers', data => {
      this.setState({ users: data });
    });
    this.socket.on('message', message => {
      this.setState({ chatMsg: this.state.chatMsg.concat(message), typingMsg: '' });
    });

    this.socket.on('typing', message => {
      this.setState({ typingMsg: `${message.username}${message.text}` });
    });

  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.input) {
      const newMsg = this.state.input.trim();

      this.socket.emit('messageChat', newMsg);
      this.setState({ input: '' });
    }

  }

  handleType(event) {
    this.socket.emit('typing');
  }

  componentDidUpdate() {
    this.textBox.current.scrollTop = this.textBox.current.scrollHeight;

  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    const users = this.state.users;
    let userList;
    if (users) {
      userList = users.map(user => {
        return (
        <li key={user.username}>{user.username}</li>
        );
      });
    }

    const chatMsgs = this.state.chatMsg;
    const chatmessages = chatMsgs.map((message, index) => {
      const currentTime = format(new Date(), 'HH:mm a');
      return (
        <div key={index}>
          <ChatMessage username={message.username} time={currentTime} text={message.text} />
        </div>
      );
    });

    return (
      <div className="chat-entrance-page">
        <div className=" col-four-fifth chat-container">
          <div className="chat-header">
            <h1>ThriveVox<span>.Chat</span></h1>
            <h2 id="room-name" className="room-title">{this.props.roomName}</h2>
          </div>
          <main className="chat-main">
            <div className="chat-sidebar">
              <h3>Users</h3>
              <ul className="user-list-display">
                {userList}
              </ul>
            </div>
            <div ref={this.textBox} className="chat-messages">
              {chatmessages}
            </div>
          </main>
          <div className="chat-form-container">
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} onKeyPress={this.handleType} value={this.state.input}
              className="chat-input" id="msg" name="msg" type="text" placeholder="Enter Message" required autoComplete="off" />
              <button type="submit" className="chat-button">Send</button>
              <a href="#chat"><button type="button" className="leave-button"><i className="fas fa-sign-out-alt"></i></button></a>
            </form>
            <div className="typing-status">{this.state.typingMsg}</div>
          </div>
        </div>
      </div>
    );
  }
}

ChatMain.contextType = AppContext;
