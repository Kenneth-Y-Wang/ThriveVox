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

    if (!this.props.searchResult) {
      return (
        <div className="no-result-message-holder">
          <h1 className="no-result-message">Sorry, No Result is Showing...</h1>
        </div>
      );
    }
    const classNameOne = this.state.isViewing ? 'detail-clicked' : 'detail-button';
    const classNameTwo = this.state.isViewing ? 'hidden-detail-row col-full' : 'hidden-detail-row col-full hidden';
    const classNameThree = 'single-search col-nine-tenth';
    const classNameFour = 'add-button';
    const classNameSix = 'add-button hidden';
    const displayOne = !this.props.searchResult.idAlbum ? 'Artist' : 'Album';
    const displayTwo = !this.props.searchResult.idAlbum ? 'Born' : 'Artist';
    const displayThree = !this.props.searchResult.idAlbum ? 'Origin' : 'First Release';
    const displayFour = !this.props.searchResult.idAlbum ? 'Artist Website' : 'Album Score';
    const displayFive = !this.props.searchResult.idAlbum ? 'Artist Biography' : 'Album Description';
    const classNameFive = !this.props.searchResult.idAlbum ? 'caro-text artist-web' : 'caro-text';

    if (!this.props.searchResult.idAlbum) {
      const {
        strArtistThumb, strArtist, intBornYear, strGenre,
        strStyle, strCountry, strWebsite, strArtistBanner, strBiographyEN
      } = this.props.searchResult;

      return (

        <ResultDisplay picUrl={strArtistThumb} detailView={this.detailView} dataId={strArtist}
          className={classNameOne} handleSave={this.handleSave} displayOne={displayOne} valueOne={strArtist}
          displayTwo={displayTwo} valueTwo={intBornYear} genre={strGenre} style={strStyle}
          displayThree={displayThree} valueThree={strCountry} displayFour={displayFour} valueFour={strWebsite}
          classNameTwo={classNameTwo} bannerUrl={strArtistBanner} displayFive={displayFive} note={strBiographyEN}
          classNameThree={classNameThree} classNameFour={classNameFour} classNameFive={classNameFive} classNameSix={classNameSix}/>

      );
    } else if (this.props.searchResult.idAlbum) {
      const {
        strAlbumThumb, strArtist, intYearReleased, strGenre,
        strStyle, strAlbum, intScore, strAlbum3DFlat, strDescriptionEN
      } = this.props.searchResult;

      return (
        <ResultDisplay picUrl={strAlbumThumb} detailView={this.detailView} dataId={strArtist}
          className={classNameOne} handleSave={this.handleSave} displayOne={displayOne} valueOne={strAlbum}
          displayTwo={displayTwo} valueTwo={strArtist} genre={strGenre} style={strStyle}
          displayThree={displayThree} valueThree={intYearReleased} displayFour={displayFour} valueFour={intScore}
          classNameTwo={classNameTwo} bannerUrl={strAlbum3DFlat} displayFive={displayFive} note={strDescriptionEN}
          classNameThree={classNameThree} classNameFour={classNameFour} classNameFive={classNameFive} classNameSix={classNameSix}/>

      );
    }
  }
}
