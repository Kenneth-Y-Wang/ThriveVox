import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      favorites: [
        {
          favoriteId: 1,
          url: 'https://i.pinimg.com/originals/3f/9b/1a/3f9b1ab0095226f5af5f5720e1a49acd.jpg',
          albumName: 'Revelations',
          artist: 'Eminem',
          firstRelease: '2020',
          genre: 'Hip-Hop',
          style: 'Urban/R&G',
          albumScore: '6.8'
        },
        {
          favoriteId: 2,
          url: 'https://media.pitchfork.com/photos/5acfc114cae28410a11144df/1:1/w_600/Marshall%20Mathers%20LP.jpg',
          albumName: 'The Marshall Mathers',
          artist: 'Eminem',
          firstRelease: '2000',
          genre: 'Hip-Hop',
          style: 'Urban/R&G',
          albumScore: '8.0'
        }
      ],
      savedFavorites: []
    };
    this.rightClick = this.rightClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.dotClick = this.dotClick.bind(this);
  }

  autoRun() {
    this.setState(this.state.index === this.state.favorites.length ? { index: 1 } : { index: this.state.index + 1 });

  }

  rightClick() {
    this.setState(this.state.index === this.state.favorites.length ? { index: 1 } : { index: this.state.index + 1 });

    clearInterval(this.timeID);
    this.timeID = setInterval(
      () => this.autoRun(),
      3000
    );

  }

  leftClick() {

    this.setState(this.state.index === 1 ? { index: this.state.favorites.length } : { index: this.state.index - 1 });

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
        // let favoriteArray=[]
        this.setState({ savedFavorites: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // this.timeID = setInterval(
    //   () => this.autoRun(),
    //   3000
    // );

  }

  render() {
    const favorites = this.state.favorites;
    const favoriteLists = favorites.map(favorite => {
      return (
        <div key={favorite.favoriteId} className={favorite.favoriteId === this.state.index ? '' : 'hidden'}>
          <div className="caro-content-holder">
            <div className="col-two-fifth caro-pic-col">
              <div className="caro-pic-holder">
                <img src={favorite.url} />
              </div>
              <h3>{favorite.albumName}</h3>
            </div>
            <div className="col-two-fifth caro-info-col">
              <h3 className="caro-text">Artist: <span>{favorite.artist}</span></h3>
              <h3 className="caro-text">First Release: <span>{favorite.firstRelease}</span></h3>
              <h3 className="caro-text">Genre: <span>{favorite.genre}</span></h3>
              <h3 className="caro-text">Style: <span>{favorite.style}</span></h3>
              <h3 className="caro-text">Album Score: <span>{favorite.albumScore}</span></h3>
              <button className="detail-button">Detail</button>
            </div>
          </div>
        </div>

      );
    });

    const listButtons = favorites.map(favorite =>
      <button onClick={this.dotClick} className={favorite.favoriteId === this.state.index ? 'dot dot-select' : 'dot'} name={favorite.favoriteId} key={favorite.favoriteId}></button>
    );
    return (
      <div className="">
        <div className="carousel-container">
          <div className=" arrow-holder col-one-tenth">
            <i onClick={this.leftClick} className="far fa-caret-square-left font-style caro-transition"></i>
          </div>
          <div className=" col-four-fifth caro-content-column">
            {favoriteLists}
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
