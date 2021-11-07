import React from 'react';
import AppContext from '../lib/app-context';
import ResultDisplay from './single-result-display';

export default class CustomAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: '',
      isViewing: '',
      allSavedFavorites: []
    };
    this.click = this.click.bind(this);
    this.detailView = this.detailView.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    fetch('/api/favorite/allSavedFavorites', {
      method: 'GET',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ allSavedFavorites: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  detailView(dataId) {
    if (this.state.isViewing === '' || dataId !== this.state.isViewing) {
      this.setState({ isViewing: dataId });
    }
    if (this.state.isViewing === dataId) {
      this.setState({ isViewing: '' });
    }
  }

  click() {
    if (this.state.isOpen === event.target.getAttribute('data-id')) {
      this.setState({ isOpen: '' });
    } else {
      this.setState({ isOpen: event.target.getAttribute('data-id') });
    }
  }

  render() {

    const allSavedFavorites = this.state.allSavedFavorites;
    const favoritesList = allSavedFavorites.map((favorite, index) => {
      const classNameOne = this.state.isViewing === index ? 'detail-clicked' : 'detail-button';
      const classNameTwo = this.state.isViewing === index ? 'hidden-detail-row col-full' : 'hidden-detail-row col-full hidden';
      const classNameThree = 'single-search col-full';
      const classNameFour = 'add-button hidden';
      if (favorite.favoriteType === 'artist') {
        const {
          strArtistThumb, strArtist, intBornYear, strGenre,
          strStyle, strCountry, strWebsite, strArtistBanner, strBiographyEN
        } = favorite.favoriteDetails;

        const displayOne = 'Artist';
        const displayTwo = 'Born';
        const displayThree = 'Origin';
        const displayFour = 'Artist Website';
        const displayFive = 'Artist Biography';
        const classNameFive = 'caro-text artist-web';
        return (
          <div className="section-content" key={index}>
            <ResultDisplay picUrl={strArtistThumb} detailView={this.detailView} dataId={index}
            className={classNameOne} handleSave={this.detailView} displayOne={displayOne} valueOne={strArtist}
            displayTwo={displayTwo} valueTwo={intBornYear} genre={strGenre} style={strStyle}
            displayThree={displayThree} valueThree={strCountry} displayFour={displayFour} valueFour={strWebsite}
            classNameTwo={classNameTwo} bannerUrl={strArtistBanner} displayFive={displayFive} note={strBiographyEN}
              classNameThree={classNameThree} classNameFour={classNameFour} classNameFive={classNameFive}/>
          </div>

        );
      } else if (favorite.favoriteType === 'album') {
        const {
          strAlbumThumb, strArtist, intYearReleased, strGenre,
          strStyle, strAlbum, intScore, strAlbum3DFlat, strDescriptionEN
        } = favorite.favoriteDetails;
        const displayOne = 'Album';
        const displayTwo = 'Artist';
        const displayThree = 'First Release';
        const displayFour = 'Album Score';
        const displayFive = 'Album Description';
        const classNameFive = 'caro-text';
        return (
          <div className="section-content" key={index} >
          <ResultDisplay picUrl={strAlbumThumb} detailView={this.detailView} dataId={index}
            className={classNameOne} handleSave={this.detailView} displayOne={displayOne} valueOne={strAlbum}
            displayTwo={displayTwo} valueTwo={strArtist} genre={strGenre} style={strStyle}
            displayThree={displayThree} valueThree={intYearReleased} displayFour={displayFour} valueFour={intScore}
              classNameTwo={classNameTwo} bannerUrl={strAlbum3DFlat} displayFive={displayFive} note={strDescriptionEN}
              classNameThree={classNameThree} classNameFour={classNameFour} classNameFive={classNameFive} />
          </div>

        );
      } else {
        return null;
      }

    });
    const { userStyle, userSkills, userInstruments, userInterest, userBand, userBio } = this.props;
    return (
      <div className="">
        <div >
          <div className="section-header" onClick={this.click} data-id="about-me">About Me</div>
          <div className={this.state.isOpen === 'about-me' ? 'content-holder open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'about-me' ? 'section-content' : 'section-content hidden'}>{userBio || 'Please tell us about your self!'}</div>
          </div>
        </div>
        <div >
          <div className="section-header" onClick={this.click} data-id="skill-style">Skills & Styles</div>
          <div className={this.state.isOpen === 'skill-style' ? 'content-holder skill-open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'skill-style' ? 'skill-content' : 'skill-content hidden'}>
              <div className="col-one-third style-col">
                <h4 className="display-info">My Band:</h4>
                <h4>{userBand || 'I Don\'t Have One..'}</h4>
                <h4 className="display-info">My Instruments:</h4>
                <h4>{userInstruments || 'N/A'}</h4>
              </div>
              <div className="col-half skill-col">
                <h4 className="display-info">My Music Styles:</h4>
                <h4>{userStyle || 'N/A'}</h4>
                <h4 className="display-info">My Skills:</h4>
                <h4>{userSkills || 'N/A'}</h4>
                <h4 className="display-info">My Interest:</h4>
                <h4>{userInterest || 'N/A'}</h4>
              </div>
            </div>
          </div>
        </div>
        <div >
          <div className="section-header" data-id="my-favorite">My Favorite</div>
          <div className="content-holder" >
            {favoritesList}
          </div>
        </div>
      </div>
    );
  }
}

CustomAccordion.contextType = AppContext;
