import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      savedFavorites: []
    };
    this.rightClick = this.rightClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.dotClick = this.dotClick.bind(this);
  }

  autoRun() {
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
        console.log(data);
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
    const defaultDisplay = (
      <div >
        <div className="caro-content-holder">
          <div className="col-two-fifth caro-pic-col">
            <div className="caro-pic-holder">
              <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
            </div>
            <h3>Your Recent Save</h3>
          </div>
          <div className="col-two-fifth caro-info-col">
            <h3 className="caro-text">Artist: <span>Can be You!</span></h3>
            <h3 className="caro-text">First Release: <span>Will be Soon..</span></h3>
            <h3 className="caro-text">Genre: <span>Your Genre</span></h3>
            <h3 className="caro-text">Style: <span>We Love Your Style!</span></h3>
            <h3 className="caro-text">Album Score: <span>10 For Sure!</span></h3>
          </div>
        </div>
      </div>
    );
    const favoriteLists = favorites.map((favorite, index) => {
      if (favorite.favoriteType === 'album') {
        return (
          <div key={favorite.favoriteId} className={index === this.state.index ? '' : 'hidden'}>
            <div className="caro-content-holder">
              <div className="col-two-fifth caro-pic-col">
                <h3 className="mg-t-75">{favorite.favoriteDetails.strAlbum}</h3>
                <div className="caro-pic-holder">
                  <img src={favorite.favoriteDetails.strAlbumThumb} />
                </div>

              </div>
              <div className="col-two-fifth caro-info-col">
                <div className="caro-detail-bt-row"><button className="caro-detail-button">Detail</button></div>
                <h3 className="caro-text">Artist: <span>{favorite.favoriteDetails.strArtist}</span></h3>
                <h3 className="caro-text">First Release: <span>{favorite.favoriteDetails.intYearReleased}</span></h3>
                <h3 className="caro-text">Genre: <span>{favorite.favoriteDetails.strGenre}</span></h3>
                <h3 className="caro-text">Style: <span>{favorite.favoriteDetails.strStyle}</span></h3>
                <h3 className="caro-text">Album Score: <span>{favorite.favoriteDetails.intScore}</span></h3>

              </div>
            </div>
          </div>
        );
      }
      if (favorite.favoriteType === 'artist') {
        return (
          <div key={favorite.favoriteId} className={index === this.state.index ? '' : 'hidden'}>
            <div className="caro-content-holder">
              <div className="col-two-fifth caro-pic-col">
                <h3 className="mg-t-75">{favorite.favoriteDetails.strArtist}</h3>
                <div className="caro-pic-holder">
                  <img src={favorite.favoriteDetails.strArtistThumb} />
                </div>

              </div>
              <div className="col-two-fifth caro-info-col">
                <div className="caro-detail-bt-row"><button className="caro-detail-button">Detail</button></div>
                <h3 className="caro-text ">Alternate Name: <span>{favorite.favoriteDetails.strArtistAlternate}</span></h3>
                <h3 className="caro-text">Born: <span>{favorite.favoriteDetails.intBornYear}</span></h3>
                <h3 className="caro-text">Genre: <span>{favorite.favoriteDetails.strGenre}</span></h3>
                <h3 className="caro-text">Style: <span>{favorite.favoriteDetails.strStyle}</span></h3>
                <h3 className="caro-text artist-web">Artist Website: <span>{favorite.favoriteDetails.strWebsite}</span></h3>

              </div>
            </div>
          </div>

        );
      }
      return null;
    });

    const listButtons = favorites.map((favorite, index) =>
      <button onClick={this.dotClick} className={index === this.state.index ? 'dot dot-select' : 'dot'} name={index} key={favorite.favoriteId}></button>
    );
    return (
      <div className="">
        <div className="carousel-container">
          <div className=" arrow-holder col-one-tenth">
            <i onClick={this.leftClick} className="far fa-caret-square-left font-style caro-transition"></i>
          </div>
          <div className=" col-four-fifth caro-content-column">
            {favorites ? favoriteLists : defaultDisplay}
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
