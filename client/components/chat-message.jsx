import React from 'react';

export default function ChatMessage(props) {
  return (
    <div className="message-group" >
      <p className="sub-text">{props.username}<span> {props.time}</span></p>
      <p className="main-text">{props.text}</p>
    </div>
  );
}

// // render message
// function outputMessage(message) {
//   const $div = document.createElement('div');
//   $div.setAttribute('class', 'message');

//   const $p = document.createElement('p');
//   $p.setAttribute('class', 'sub');
//   $p.textContent = message.username;
//   $p.innerHTML += `<span> ${message.time}</span>`;
//   $div.appendChild($p);

//   const $text = document.createElement('p');
//   $text.setAttribute('class', 'text');
//   $text.textContent = message.text;
//   $div.appendChild($text);
//   document.querySelector('.chat-messages').appendChild($div);
// }
// //
