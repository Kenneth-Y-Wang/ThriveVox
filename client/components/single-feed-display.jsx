import React from 'react';
import Comment from './comment';

export default function SingleFeed(props) {
  const emailHref = `mailto:${props.email}`;
  return (
    <div className=" col-nine-tenth single-user-search-holder">
      <div className="col-two-fifth search-profile-pic-col">
        <div className="profile-pic-holder"><img src={props.avaterUrl || '/images/b50797c8a7420ba660b2b310f8698811.jpg'} /></div>
      </div>
      <div className="col-three-fifth search-user-info-col">
        <div className="name-detail-row">
          <h3 className="post-user">{props.username}<span id="band-name"> [ Band: {!props.userBand || props.userBand === 'null' ? 'N/A' : props.userBand} ]</span></h3>
          <div className="result-button-row">
           <button onClick={() => props.handleComment(props.postId)} className=" user-detail-button comment-button" type='button'>Comment</button>
           <button onClick={() => props.handleDelete(props.postId)} className={props.userId === props.userLoginId ? 'user-detail-button' : 'user-detail-button hidden'} type='button'><i className="far fa-trash-alt"></i></button>
          </div>
        </div>
        <h3 className="user-info-text">Location:<span> {props.userLocation}</span></h3>
        <h3 className="user-info-text">Email:
          <span> <a className="email-link" target="_blank" rel="noopener noreferrer" href={emailHref}>{props.email}</a></span>
        </h3>
        <h3 className="user-info-text">Post Title: <span>{props.title}</span><span id="post-date"> Posted on: {props.date}</span></h3>
        <p className="post-text">{props.content}</p>
      </div>
      <div className={props.postId === props.checkId ? 'col-full comment-col' : 'col-full comment-col hidden'} >
        <Comment />
      </div>
    </div>
  );
}
