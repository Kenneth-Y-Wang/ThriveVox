import React from 'react';

export default function ChatMessage(props) {
  return (
    <div className="message-group" >
      <p className="sub-text">{props.username}<span> {props.time}</span></p>
      <p className="main-text">{props.text}</p>
    </div>
  );
}
