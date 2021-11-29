import React from 'react';
import Comment from './comment';
import EditPost from './post-edit';

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
            <button onClick={() => props.confirmPostDelete(props.postId)} className={props.userId === props.userLoginId ? 'user-detail-button delete-button' : 'user-detail-button delete-button hidden'} type='button'><i className="far fa-trash-alt"></i></button>
            <button onClick={() => props.confirmPostEdit(props.postId)} className={props.userId === props.userLoginId ? 'user-detail-button' : 'user-detail-button hidden'} type="button"><i className="far fa-edit"></i></button>
          </div>
        </div>
        <h3 className="user-info-text">Post Title: <span>{props.title}</span></h3>
        <h3 className="user-info-text">Location:<span> {props.userLocation}</span></h3>
        <h3 className="user-info-text">Email:
          <span> <a className="email-link" target="_blank" rel="noopener noreferrer" href={emailHref}>{props.email}</a></span>
        </h3>
        <p className="post-text">{props.content}</p>
        <div>
          {props.audioUrl ? <audio src={props.audioUrl} controls /> : <div></div>}
        </div>
        <p id="post-date">Posted on: {props.date}</p>
      </div>
      <div className={props.postId === props.checkId ? 'col-full comment-col' : 'col-full comment-col hidden'} >
        <Comment postId={props.postId} refresh={props.refresh} />
      </div>
      <div className={props.isDeleting === props.postId ? 'detail-modal-holder' : 'detail-modal-holder hidden'}>
        <div className="col-two-fifth detail-block">
          <h3>Confirm to delete?</h3>
          <div className="delete-button-row">
            <button onClick={() => props.confirmPostDelete(props.postId)} className="user-detail-button detail-block-button">BACK</button>
            <button onClick={() => props.handleDelete(props.postId)} className="user-detail-button detail-block-button">CONFIRM</button>
          </div>
        </div>
      </div>
      < EditPost isEditing={props.isEditing} editPost={props.editPost} postId={props.postId} title={props.title} content={props.content} confirmPostEdit={props.confirmPostEdit}/>
    </div>
  );
}
