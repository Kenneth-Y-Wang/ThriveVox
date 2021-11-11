import React from 'react';

export default function SingleUserResult(props) {
  const emailHref = `mailto:${props.email}`;
  return (
      <div className=" col-nine-tenth single-user-search-holder">
        <div className="col-two-fifth search-profile-pic-col">
         <div className="profile-pic-holder"><img src={props.avaterUrl || '/images/b50797c8a7420ba660b2b310f8698811.jpg'} /></div>
        </div>
        <div className="col-three-fifth search-user-info-col">
          <div className="name-detail-row">
            <h3 >{props.username}<span> [ Band: {props.userBand || 'N/A'} ]</span></h3>
            <button onClick={() => props.detailView(props.userId)} className=" user-detail-button" type='button'>Detail</button>
          </div>
          <h3 className="user-info-text">Location:<span> {props.userLocation}</span></h3>
          <h3 className="user-info-text">Primary Interest:<span> {props.userPrimaryInterest || 'N/A'}</span></h3>
          <h3 className="user-info-text">Styles:<span> {props.userStyle || 'N/A'}</span></h3>
          <h3 className="user-info-text">Skills:<span> {props.userSkills || 'N/A'}</span></h3>
          <h3 className="user-info-text">Email:
           <span> <a className="email-link" target="_blank" rel="noopener noreferrer" href={emailHref}>{props.email}</a></span>
          </h3>
        </div>
       <div className={props.detailShowing === props.userId ? 'detail-modal-holder' : 'detail-modal-holder hidden'}>
          <div className="col-three-fifth detail-block">
            <h3>About Me</h3>
            <div className="about-me-holder">
              {props.userBio || "We don't know that much about him/her..."}
            </div>
            <h4>My Instruments</h4>
            <h5>{props.userInstruments || 'N/A'}</h5>
            <h4>My Interests</h4>
            <h5>{props.userInterest || 'N/A'}</h5>
            <h4>Contact Me:</h4>
            <a className="email-link" target="_blank" rel="noopener noreferrer" href={emailHref}>{props.email}</a>
            <button onClick={() => props.goBack(props.userId)}className="user-detail-button">Back</button>
          </div>
        </div>
      </div>
  );
}
