import React from 'react';

export default class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMsg: null
    };
  }

  render() {
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
              <ul id="users"></ul>
            </div>
            <div className="chat-messages"></div>
          </main>
          <div className="chat-form-container">
            <form id="chat-form">
              <input className="chat-input" id="msg" name="msg" type="text" placeholder="Enter Message" required autoComplete="off" />
              <button className="btn chat-button">Send</button>
              <a href="#chat"><button id="leave-btn" type="button" className="btn"><i className="fas fa-sign-out-alt"></i></button></a>
            </form>
            <div className="typing-status"></div>
          </div>
        </div>
      </div>
    );
  }
}
