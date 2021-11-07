import React from 'react';
import CarouselAlbumSlide from './carousel-album-slide';
import CarouselArtistSlide from './carousel-artist-slide';
import DefaultDisplay from './carousel-default-slide';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      savedFavorites: []

    };
    this.rightClick = this.rightClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.dotClick = this.dotClick.bind(this);
  }

  autoRun() {

    if (this.state.savedFavorites.length === 0) {
      return;
    }
    this.setState(this.state.index === (this.state.savedFavorites.length - 1) ? { index: 0 } : { index: this.state.index + 1 });

  }

  rightClick() {
    this.setState(this.state.index === (this.state.savedFavorites.length - 1) ? { index: 0 } : { index: this.state.index + 1 });

    clearInterval(this.timeID);
    this.timeID = setInterval(
      () => this.autoRun(),
      3000
    );

  }

  leftClick() {

    this.setState(this.state.index === 0 ? { index: (this.state.savedFavorites.length - 1) } : { index: this.state.index - 1 });

    clearInterval(this.timeID);
    this.timeID = setInterval(
      () => this.autoRun(),
      3000
    );
  }

  dotClick() {
    this.setState({ index: Number(event.target.name) });
    clearInterval(this.timeID);
    this.timeID = setInterval(
      () => this.autoRun(),
      3000
    );

  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    fetch('/api/favorite/savedFavorite', {
      method: 'GET',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ savedFavorites: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });

    this.timeID = setInterval(
      () => this.autoRun(),
      3000
    );

  }

  render() {
    const favorites = this.state.savedFavorites;

    const favoriteLists = favorites.map((favorite, index) => {
      if (favorite.favoriteType === 'album') {
        const { strAlbum, strAlbumThumb, strArtist, intYearReleased, strGenre, strStyle, intScore } = favorite.favoriteDetails;

        return (
          <div key={favorite.favoriteId} className={index === this.state.index ? '' : 'hidden'}>
            <CarouselAlbumSlide title={strAlbum} picUrl={strAlbumThumb}artistName={strArtist} time={intYearReleased}
              genre={strGenre} style={strStyle} site={intScore} />
          </div>
        );
      }
      if (favorite.favoriteType === 'artist') {
        const { strArtist, strArtistThumb, strArtistAlternate, intBornYear, strGenre, strStyle, strWebsite } = favorite.favoriteDetails;
        return (
          <div key={favorite.favoriteId} className={index === this.state.index ? '' : 'hidden'}>
            <CarouselArtistSlide name={strArtist} picUrl={strArtistThumb} artistAltName={strArtistAlternate} time={intBornYear}
              genre={strGenre} style={strStyle} site={strWebsite} />
          </div>

        );
      }
      return null;
    });

    const listButtons = favorites.map((favorite, index) =>
      <button onClick={this.dotClick} className={index === this.state.index ? 'dot dot-select' : 'dot'} name={index} key={favorite.favoriteId}></button>
    );
    const carouselDisplay = favorites.length !== 0 ? favoriteLists : < DefaultDisplay />;
    return (
      <div className="">
        <div className="carousel-container">
          <div className=" arrow-holder col-one-tenth">
            <i onClick={this.leftClick} className="far fa-caret-square-left font-style caro-transition"></i>
          </div>
          <div className=" col-four-fifth caro-content-column">
            {carouselDisplay}
            <div className="dot-holder">
              {listButtons}
            </div>
          </div>
          <div className=" arrow-holder col-one-tenth">
            <i onClick={this.rightClick} className="far fa-caret-square-right font-style caro-transition"></i>
          </div>
        </div>
      </div>
    );
  }
}
