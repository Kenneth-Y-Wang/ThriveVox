import React from 'react';
import ResultDisplay from './single-result-display';

export default class FavoriteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewing: false
    };
    this.detailView = this.detailView.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  detailView(event) {

    this.setState({ isViewing: !this.state.isViewing });

  }

  handleSave() {
    const token = window.localStorage.getItem('react-context-jwt');
    fetch('/api/favorite/savedFavorite', {
      method: 'POST',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.searchResult)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('error', error);
      });
  }

  render() {
    const classNameOne = this.state.isViewing ? 'detail-clicked' : 'detail-button';
    const classNameTwo = this.state.isViewing ? 'hidden-detail-row col-full' : 'hidden-detail-row col-full hidden';
    if (!this.props.searchResult) {
      return (
        <div className="no-result-message-holder">
          <h1 className="no-result-message">Sorry, No Result is Showing...</h1>
        </div>
      );
    }
    if (!this.props.searchResult.idAlbum) {
      const {
        strArtistThumb, strArtist, intBornYear, strGenre,
        strStyle, strCountry, strWebsite, strArtistBanner, strBiographyEN
      } = this.props.searchResult;

      const displayOne = 'Artist';
      const displayTwo = 'Born';
      const displayThree = 'Origin';
      const displayFour = 'Artist Website';
      const displayFive = 'Artist Biography';
      return (

        <ResultDisplay picUrl={strArtistThumb} detailView={this.detailView} dataId={strArtist}
          className={classNameOne} handleSave={this.handleSave} displayOne={displayOne} valueOne={strArtist}
          displayTwo={displayTwo} valueTwo={intBornYear} genre={strGenre} style={strStyle}
          displayThree={displayThree} valueThree={strCountry} displayFour={displayFour} valueFour={strWebsite}
          classNameTwo={classNameTwo} bannerUrl={strArtistBanner} displayFive={displayFive} note={strBiographyEN} />

      );
    } else if (this.props.searchResult.idAlbum) {
      const {
        strAlbumThumb, strArtist, intYearReleased, strGenre,
        strStyle, strAlbum, intScore, strAlbum3DFlat, strDescriptionEN
      } = this.props.searchResult;
      const displayOne = 'Album';
      const displayTwo = 'Artist';
      const displayThree = 'First Release';
      const displayFour = 'Album Score';
      const displayFive = 'Album Description';
      return (
        <ResultDisplay picUrl={strAlbumThumb} detailView={this.detailView} dataId={strArtist}
          className={classNameOne} handleSave={this.handleSave} displayOne={displayOne} valueOne={strAlbum}
          displayTwo={displayTwo} valueTwo={strArtist} genre={strGenre} style={strStyle}
          displayThree={displayThree} valueThree={intYearReleased} displayFour={displayFour} valueFour={intScore}
          classNameTwo={classNameTwo} bannerUrl={strAlbum3DFlat} displayFive={displayFive} note={strDescriptionEN} />

      );
    }
  }
}
