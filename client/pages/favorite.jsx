import React from 'react';
import Carousel from '../components/carousel';

const pics = [
  {
    id: 1,
    url: 'https://cdn.mos.cms.futurecdn.net/G8tpf6HYLdXLxLHMKK3G-1200-80.jpg'
  },

  {
    id: 2,
    url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/08/final-fantasy-16-versus-13.jpg'
  },

  {
    id: 3,
    url: 'https://www.videogameschronicle.com/files/2020/10/Final-Fantasy-XVI-d-scaled.jpg'
  }
];

export default class FavoriteSearch extends React.Component {
  render() {
    return (
       <div>
        <div className="col-nine-tenth search-holder">
          <div className="col-three-fifth search-bar-section">
            <h1 className="search-title">My Favorite</h1>
            <form>
              <div className="row align-center">
                <button className="favorite-search-button"><i className="fas fa-headphones-alt"></i></button>
                <input className="favorite-search-input" />
              </div>
              <div className="search-button-holder">
                <button className="search-button">By Artist</button>
                <button className="search-button">By Album</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-nine-tenth favorite-caro">
          <Carousel pics={pics} />
        </div>
        <div className="section-header">Search Result</div>
        <div className="search-result-holder">

        </div>
       </div>
    );
  }
}
