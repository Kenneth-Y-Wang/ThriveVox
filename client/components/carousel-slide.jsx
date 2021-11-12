import React from 'react';

export default function CarouselSlide({
  title, picUrl, labelOne, valueOne,
  labelTwo, valueTwo, genre, style, className, labelThree, valueThree
}) {
  return (
    <>
      <div className="caro-content-holder">
        <div className="col-two-fifth caro-pic-col">
          <h3 className="mg-t-75">{title}</h3>
          <div className="caro-pic-holder">
            <img src={picUrl} />
          </div>
        </div>
        <div className="col-two-fifth caro-info-col">
          <a href="#"className="caro-detail-bt-row"><button className="caro-detail-button">Detail</button></a>
          <h3 className="caro-text ">{labelOne}: <span>{valueOne || 'N/A'}</span></h3>
          <h3 className="caro-text">{labelTwo}: <span>{valueTwo || 'N/A'}</span></h3>
          <h3 className="caro-text">Genre: <span>{genre || 'N/A'}</span></h3>
          <h3 className="caro-text">Style: <span>{style || 'N/A'}</span></h3>
          <h3 className={className}>{labelThree}: <span>{valueThree || 'N/A'}</span></h3>
        </div>
      </div>
    </>
  );

}
