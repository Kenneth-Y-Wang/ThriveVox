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
          <div className="single-search col-nine-tenth">
            <div className="default-row col-full">
              <div className="col-half">
                <div className="search-pic-holder">
                  <img src="https://pm1.narvii.com/7007/bc7b39405efc29381742bed98604a436426a0892r1-1400-1400v2_hq.jpg" />
                </div>
              </div>
              <div className="col-half search-info-col">
                <div className="result-button-row">
                  <button className="detail-button">Detail</button>
                  <button className="add-button"><i className="fas fa-plus"></i></button>
                </div>
                <h3 className="caro-text">Artist: <span>Lady Gaga</span></h3>
                <h3 className="caro-text">Born: <span>1986</span></h3>
                <h3 className="caro-text">Genre: <span>Pop</span></h3>
                <h3 className="caro-text">Style: <span>Rock/Pop</span></h3>
                <h3 className="caro-text">Origin: <span>New York, USA</span></h3>
                <h3 className="caro-text">Artist Website: <span>www.ladygaga.com</span></h3>
              </div>
            </div>
            <div className="hidden-detail-row col-full">
              <div className="banner-holder col-full">
                <img src="https://i.redd.it/a4p4cwddjlb41.jpg" />
              </div>
              <div className="search-note col-full">
                <h3 className="caro-text">Artist Biography:</h3>
                <p className="detail-note">
                  Stefani Joanne Angelina Germanotta (born March 28, 1986), known professionally as Lady Gaga, is an American singer, songwriter, and actress. She is known for her self-empowering messages, fashion, and live performances. Gaga initially performed in theater, appearing in high school plays, and studied at CAP21 through New York University's Tisch School of the Arts before dropping out to pursue a musical career. After leaving a rock band, participating in the Lower East Side's avant garde performance art circuit, and being dropped from a contract with Def Jam Recordings, Gaga worked as a songwriter for Sony/ATV Music Publishing. There, recording artist Akon noticed her vocal abilities and helped her to sign a joint deal with Interscope Records and his own KonLive Distribution.
                </p>
              </div>
            </div>

          </div>

        </div>
       </div>
    );
  }
}
