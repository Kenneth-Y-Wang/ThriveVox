import React from 'react';
import Carousel from '../components/carousel';
import FavoriteDisplay from '../components/favorite-display';

export default class FavoriteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      searchInput: '',
      assistInput: '',
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
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchInput);
    const input = this.state.searchInput;
    const assistInput = this.state.assistInput;

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

    if (this.state.searchType === 'Album') {
      console.log(this.state.assistInput);
      fetch(`https://theaudiodb.p.rapidapi.com/searchalbum.php?s=${assistInput}&a=${input}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'theaudiodb.p.rapidapi.com',
          'x-rapidapi-key': '3ac221b76dmsh761303974d244fbp12a694jsna1c5bc30b528'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
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
                <input onChange={this.handleChange} name="searchInput" id="favorite" type="text" className="favorite-search-input" />
              </div>
              <input onChange={this.handleChange} name="assistInput" id="artistName" type="text" className={this.state.searchType === 'Album' ? 'artist-input' : 'artist-input hidden'}
                placeholder="Type In Album Artist" />
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
         <FavoriteDisplay searchResult={this.state.searchResult} />
        </div>
       </div>
    );
  }
}
