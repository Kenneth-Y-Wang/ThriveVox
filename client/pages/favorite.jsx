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
    let fetchPath;
    let fileName;
    if (this.state.searchType === 'Album') {
      fetchPath = `https://theaudiodb.p.rapidapi.com/searchalbum.php?s=${assistInput}&a=${input}`;
      fileName = 'album';

    } else {
      fetchPath = `https://theaudiodb.p.rapidapi.com/search.php?s=${input}`;
      fileName = 'artists';
    }

    fetch(fetchPath, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'theaudiodb.p.rapidapi.com',
        'x-rapidapi-key': '3ac221b76dmsh761303974d244fbp12a694jsna1c5bc30b528'
      }
    })
      .then(response => response.json())
      .then(data => {
        const [result] = data[fileName];
        console.log(result);
        this.setState({ searchResult: result });
      })
      .catch(err => {
        console.error(err);
      });

  }

  // handleSave() {

  // }

  render() {

    return (
       <div>
        <div className="col-nine-tenth search-holder">
          <div className="col-three-fifth search-bar-section">
            <h1 className="search-title">My Favorite <span>by {this.state.searchType}</span></h1>
            <form onSubmit={this.handleSubmit}>
              <div className="row align-center">
                <button type="submit" className="favorite-search-button"><i className="fas fa-compact-disc"></i></button>
                <input onChange={this.handleChange} name="searchInput" id="favorite" type="text"
                       className="favorite-search-input" placeholder="Type in Your Favorite" />
              </div>
              <div className={this.state.searchType === 'Album' ? 'row align-center' : 'row align-center hidden'}>
                <button type="button" className="favorite-search-button"><i className="fas fa-headphones-alt"></i></button>
                <input onChange={this.handleChange} name="assistInput" id="artistName" type="text" className= "artist-input"
                  placeholder="Type In Album Artist" />
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
         <FavoriteDisplay searchResult={this.state.searchResult} />
        </div>
       </div>
    );
  }
}
