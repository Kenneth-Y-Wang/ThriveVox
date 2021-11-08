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
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete(favoriteId) {

    const token = window.localStorage.getItem('react-context-jwt');
    fetch(`/api/favorite/allSavedFavorites/${favoriteId}`, {
      method: 'DELETE',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      },
      body: null
    });

    for (let i = 0; i < this.state.allSavedFavorites.length; i++) {
      if (favoriteId === this.state.allSavedFavorites[i].favoriteId) {
        const newState = this.state.allSavedFavorites.slice(0, i).concat(this.state.allSavedFavorites.slice(i + 1));
        this.setState({ allSavedFavorites: newState });
        break;
      }

    }

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
      const classNameSix = 'add-button';
      const displayOne = favorite.favoriteType === 'artist' ? 'Artist' : 'Album';
      const displayTwo = favorite.favoriteType === 'artist' ? 'Born' : 'Artist';
      const displayThree = favorite.favoriteType === 'artist' ? 'Origin' : 'First Release';
      const displayFour = favorite.favoriteType === 'artist' ? 'Artist Website' : 'Album Score';
      const displayFive = favorite.favoriteType === 'artist' ? 'Artist Biography' : 'Album Description';
      const classNameFive = favorite.favoriteType === 'artist' ? 'caro-text artist-web' : 'caro-text';
      const favoriteId = favorite.favoriteId;
      if (favorite.favoriteType === 'artist') {
        const {
          strArtistThumb, strArtist, intBornYear, strGenre,
          strStyle, strCountry, strWebsite, strArtistBanner, strBiographyEN
        } = favorite.favoriteDetails;

        return (
          <div className="section-content" key={index}>
            <ResultDisplay picUrl={strArtistThumb} detailView={this.detailView} dataId={index} handleDelete={this.handleDelete}
              favoriteId={favoriteId} className={classNameOne} displayOne={displayOne} valueOne={strArtist}
            displayTwo={displayTwo} valueTwo={intBornYear} genre={strGenre} style={strStyle}
            displayThree={displayThree} valueThree={strCountry} displayFour={displayFour} valueFour={strWebsite}
            classNameTwo={classNameTwo} bannerUrl={strArtistBanner} displayFive={displayFive} note={strBiographyEN}
              classNameThree={classNameThree} classNameFour={classNameFour} classNameFive={classNameFive} classNameSix={classNameSix}/>
          </div>

        );
      } else if (favorite.favoriteType === 'album') {
        const {
          strAlbumThumb, strArtist, intYearReleased, strGenre,
          strStyle, strAlbum, intScore, strAlbum3DFlat, strDescriptionEN
        } = favorite.favoriteDetails;

        return (
          <div className="section-content" key={index} >
            <ResultDisplay picUrl={strAlbumThumb} detailView={this.detailView} dataId={index} handleDelete={this.handleDelete}
              favoriteId={favoriteId} className={classNameOne} displayOne={displayOne} valueOne={strAlbum}
            displayTwo={displayTwo} valueTwo={strArtist} genre={strGenre} style={strStyle}
            displayThree={displayThree} valueThree={intYearReleased} displayFour={displayFour} valueFour={intScore}
              classNameTwo={classNameTwo} bannerUrl={strAlbum3DFlat} displayFive={displayFive} note={strDescriptionEN}
              classNameThree={classNameThree} classNameFour={classNameFour} classNameFive={classNameFive} classNameSix={classNameSix} />
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
            {this.state.allSavedFavorites.length !== 0
              ? favoritesList
              : <h4 className="text-center">Sorry, You Do Not Have Any Favorite Saved...</h4>}
          </div>
        </div>
      </div>
    );
  }
}

CustomAccordion.contextType = AppContext;
