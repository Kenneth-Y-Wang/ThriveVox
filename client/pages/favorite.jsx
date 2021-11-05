import React from 'react';
import Carousel from '../components/carousel';

export default class FavoriteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      searchInput: '',
      searchType: 'Artist'

    };
    this.searchTypeChoose = this.searchTypeChoose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchTypeChoose(event) {
    this.setState({ searchType: event.target.getAttribute('data-type') });
  }

  handleChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchInput);
    const input = this.state.searchInput;

    if (this.state.searchType === 'Artist') {
      fetch(`https://theaudiodb.p.rapidapi.com/search.php?s=${input}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'theaudiodb.p.rapidapi.com',
          'x-rapidapi-key': '3ac221b76dmsh761303974d244fbp12a694jsna1c5bc30b528'
        }
      })
        .then(response => response.json())
        .then(data => {
          const [artist] = data.artists;
          console.log(artist);
          this.setState({ searchResult: artist });
        })

        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    return (
       <div>
        <div className="col-nine-tenth search-holder">
          <div className="col-three-fifth search-bar-section">
            <h1 className="search-title">My Favorite <span>by {this.state.searchType}</span></h1>
            <form onSubmit={this.handleSubmit}>
              <div className="row align-center">
                <button type="submit" className="favorite-search-button"><i className="fas fa-headphones-alt"></i></button>
                <input onChange={this.handleChange} name="favorite" id="favorite" type="text" className="favorite-search-input" />
              </div>
              <div className="search-button-holder">
                <button type="button" onClick={this.searchTypeChoose}className="search-button" data-type="Artist">By Artist</button>
                <button type="button" onClick={this.searchTypeChoose}className="search-button" data-type="Album">By Album</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-nine-tenth favorite-caro">
          <Carousel />
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
