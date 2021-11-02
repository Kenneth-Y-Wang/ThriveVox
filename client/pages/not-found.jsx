import React from 'react';

export default function NotFound(props) {
  return (

    <div className="no-found-display">
      <div className="message-holder col-four-fifth">
        <h3>
          Uh oh, we could not find the page you were looking for!
        </h3>
        <p >
          <a className="return-message" href="#">Return Home</a>
        </p>
      </div>
    </div>

  );
}
