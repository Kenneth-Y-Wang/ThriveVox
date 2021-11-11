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
    this.searchMusician = this.searchMusician.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.detailView = this.detailView.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  searchBand() {
    this.setState({ searchType: 'band' });

  }

  searchMusician() {
    this.setState({ searchType: 'musician' });

  }

  detailView(userId) {

    this.setState({ detailView: userId });

  }

  goBack(userId) {
    if (this.state.detailView === userId) {
      this.setState({ detailView: '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const location = this.state.location.toLowerCase();
    const searchType = this.state.searchType;

    const token = window.localStorage.getItem('react-context-jwt');
    fetch('/api/users/search?searchType=' + searchType + '&location=' + location, {
      method: 'GET',
      headers: {
        'react-context-jwt': token

      }

    })
      .then(response => response.json())
      .then(data => {

        this.setState({ searchResult: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    this.setState({ searchType: '' });
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    const usersList = this.state.searchResult;
    const userDisplayList = usersList.map(user => {

      const {
        userId, username, email, userLocation, avaterUrl, userStyle, userSkills,
        userInstruments, userPrimaryInterest, userInterest, userBand, userBio
      } = user;
      return (
          <div key={userId}>
            < SingleUserResult avaterUrl={avaterUrl} username={username} userBand={userBand} userInterest={userInterest}
              detailView={this.detailView} userId={userId} userLocation={userLocation} userPrimaryInterest={userPrimaryInterest} goBack={this.goBack}
            detailShowing={this.state.detailView} userStyle={userStyle} userSkills={userSkills} email={email} userBio={userBio} userInstruments={userInstruments} />
          </div>
      );
    });

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
            <div onClick={this.searchMusician} className={this.state.searchType === 'musician' ? 'button-pic-holder chosen' : 'button-pic-holder'} >
             <img src="/images/cover_image-1627388726.jpg" />
            </div>
            <h1>Musician</h1>
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
          {this.state.searchResult.length !== 0
            ? userDisplayList
            : <h4 className="text-center">Sorry, no search result available...</h4>}
        </div>
    </>
    );
  }
}

SearchUsers.contextType = AppContext;
