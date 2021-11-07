
import React from 'react';

export default function CarouselAlbumSlide(props) {
  return (
    <>
      <div className="caro-content-holder">
        <div className="col-two-fifth caro-pic-col">
          <h3 className="mg-t-75">{props.title}</h3>
          <div className="caro-pic-holder">
            <img src={props.picUrl} />
          </div>
        </div>
        <div className="col-two-fifth caro-info-col">
          <div className="caro-detail-bt-row"><button className="caro-detail-button">Detail</button></div>
          <h3 className="caro-text">Artist: <span>{props.artistName}</span></h3>
          <h3 className="caro-text">First Release: <span>{props.time || 'N/A'}</span></h3>
          <h3 className="caro-text">Genre: <span>{props.genre || 'N/A'}</span></h3>
          <h3 className="caro-text">Style: <span>{props.style || 'N/A'}</span></h3>
          <h3 className="caro-text">Album Score: <span>{props.site || 'N/A'}</span></h3>
        </div>
      </div>
    </>
  );

}
