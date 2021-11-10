import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOk: true };
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
    <>
      <form>
        <div className="col-nine-tenth user-search-holder">
         <div className=" col-three-fifth location-search-bar">
          <label htmlFor="location">Location:</label>
              <input className="favorite-search-input" id="location" name='location' type="text"></input>
         </div>
        </div>
        < div className="col-full option-search-holder">
          <div className="col-two-fifth option-col">
            <div className="button-pic-holder"><img src="/images/cover_image-1627388726.jpg" /></div>
            <h1>Musian</h1>
          </div>
        </div>
      </form>
    </>
    );
  }
}

SearchUsers.contextType = AppContext;
