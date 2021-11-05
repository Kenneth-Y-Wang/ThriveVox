import React from 'react';

export default class FavoriteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewing: ''
    };
    this.detailView = this.detailView.bind(this);
  }

  detailView(event) {
    if (this.state.isViewing) {
      this.setState({ isViewing: '' });
    } else {
      this.setState({ isViewing: event.target.getAttribute('data-id') });
    }
  }

  render() {
    if (this.props.searchResult) {
      const {
        strArtistThumb, strArtist, intBornYear, strGenre,
        strStyle, strCountry, strWebsite, strArtistBanner, strBiographyEN
      } = this.props.searchResult;
      return (
      <>
        <div className="single-search col-nine-tenth">
          <div className="default-row col-full">
            <div className="col-half">
              <div className="search-pic-holder">
                  <img src={strArtistThumb} />
              </div>
            </div>
            <div className="col-half search-info-col">
              <div className="result-button-row">
                  <button onClick={this.detailView} data-id={strArtist} type="button" className="detail-button">Detail</button>
                <button className="add-button"><i className="fas fa-plus"></i></button>
              </div>
                <h3 className="caro-text">Artist: <span>{strArtist}</span></h3>
                <h3 className="caro-text">Born: <span>{intBornYear}</span></h3>
                <h3 className="caro-text">Genre: <span>{strGenre}</span></h3>
                <h3 className="caro-text">Style: <span>{strStyle}</span></h3>
                <h3 className="caro-text">Origin: <span>{strCountry}</span></h3>
                <h3 className="caro-text">Artist Website: <span>{strWebsite}</span></h3>
            </div>
          </div>
            <div className={this.state.isViewing === this.props.searchResult.strArtist ? 'hidden-detail-row col-full' : 'hidden-detail-row col-full hidden'}>
            <div className="banner-holder col-full">
                <img src={strArtistBanner} />
            </div>
            <div className="search-note col-full">
              <h3 className="caro-text">Artist Biography:</h3>
              <p className="detail-note">
                  {strBiographyEN}
              </p>
            </div>
          </div>
        </div>
      </>
      );
    } else {
      return (
        <div className="no-result-message-holder">
         <h1 className="no-result-message">Sorry, No Result is Showing...</h1>
        </div>
      );
    }
  }
}
