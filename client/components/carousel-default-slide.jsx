import React from 'react';

export default function DefaultDisplay() {
  return (

<div >
  <div className="caro-content-holder">
    <div className="col-two-fifth caro-pic-col">
      <div className="caro-pic-holder">
        <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
      </div>
      <h3>Your Recent Save</h3>
    </div>
    <div className="col-two-fifth caro-info-col">
      <h3 className="caro-text">Artist: <span>Can be You!</span></h3>
      <h3 className="caro-text">First Release: <span>Will be Soon..</span></h3>
      <h3 className="caro-text">Genre: <span>Your Genre</span></h3>
      <h3 className="caro-text">Style: <span>We Love Your Style!</span></h3>
      <h3 className="caro-text">Album Score: <span>10 For Sure!</span></h3>
    </div>
  </div>
</div>
  );
}
