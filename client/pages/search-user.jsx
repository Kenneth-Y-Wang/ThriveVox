import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import SingleUserResult from '../components/single-user-search-result';

export default class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      searchType: '',
      detailView: '',
      searchResult: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchBand = this.searchBand.bind(this);
    this.searchMusian = this.searchMusian.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  searchBand() {
    this.setState({ searchType: 'band' });
    console.log('band');
  }

  searchMusian() {
    this.setState({ searchType: 'musian' });
    console.log('mu');
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
    <>
      <form onSubmit={this.handleSubmit}>
        <div className="col-nine-tenth user-search-holder">
         <div className=" col-three-fifth location-search-bar">
          <label htmlFor="location">Location:</label>
              <input required onChange={this.handleChange} value={this.state.location}
              className="favorite-search-input" id="location" name='location' type="text"></input>
         </div>
        </div>
        <div className="col-full option-search-holder">
          <div className="col-two-fifth option-col">
            <div onClick={this.searchMusian} className={this.state.searchType === 'musian' ? 'button-pic-holder chosen' : 'button-pic-holder'} >
             <img src="/images/cover_image-1627388726.jpg" />
            </div>
            <h1>Musian</h1>
          </div>
          <div className="col-two-fifth option-col">
            <div onClick={this.searchBand} className={this.state.searchType === 'band' ? 'button-pic-holder chosen' : 'button-pic-holder'}>
              <img src="/images/photo-1501612780327-45045538702b.jpeg" />
            </div>
            <h1>Band</h1>
          </div>
        </div>
      </form>
        <div className="section-header">Search Result</div>
        <div className="search-result-holder">
          <SingleUserResult />
        </div>
    </>
    );
  }
}

SearchUsers.contextType = AppContext;
