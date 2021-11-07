import React from 'react';

export default function ResultDisplay({
  picUrl, detailView, dataId, className, handleSave, displayOne, valueOne,
  displayTwo, valueTwo, genre, style, displayThree, valueThree, displayFour, valueFour,
  classNameTwo, bannerUrl, displayFive, note
}) {

  return (
    <>
      <div className="single-search col-nine-tenth">
        <div className="default-row col-full">
          <div className="col-half">
            <div className="search-pic-holder">
              <img src={picUrl} />
            </div>
          </div>
          <div className="col-half search-info-col">
            <div className="result-button-row">
              <button onClick={() => detailView()} data-id={dataId} type="button"
                className={className}>Detail</button>
              <button onClick={() => handleSave()} className="add-button"><i className="fas fa-plus"></i></button>
            </div>
            <h3 className="caro-text">{displayOne}: <span>{valueOne}</span></h3>
            <h3 className="caro-text">{displayTwo}: <span>{valueTwo || 'N/A'}</span></h3>
            <h3 className="caro-text">Genre: <span>{genre || 'N/A'}</span></h3>
            <h3 className="caro-text">Style: <span>{style || 'N/A'}</span></h3>
            <h3 className="caro-text">{displayThree}: <span>{valueThree || 'N/A'}</span></h3>
            <h3 className="caro-text">{displayFour}: <span>{valueFour || 'N/A'}</span></h3>
          </div>
        </div>
        <div className={classNameTwo}>
          <div className="banner-holder col-full">
            <img src={bannerUrl} />
          </div>
          <div className="search-note col-full">
            <h3 className="caro-text">{displayFive}:</h3>
            <p className="detail-note">
              {note}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
