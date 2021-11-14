import React from 'react';

export default function ConfirmModal(props) {
  return (
    <div className={props.isDeleting === true ? 'detail-modal-holder' : 'detail-modal-holder hidden'}>
      <div className="col-three-fifth detail-block">
        <h3>Confirm to delete?</h3>
        <button onClick={() => props.goBack()} className="user-detail-button">BACK</button>
        <button onClick={() => props.goBack(props.postId)} className="user-detail-button">CONFIRM</button>
      </div>
    </div>
  );
}
