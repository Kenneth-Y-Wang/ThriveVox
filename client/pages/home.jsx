import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import CustomAccordion from '../components/accordion';

export default class Home extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;
    const displayName = this.context.user.username;
    const displayLocation = this.context.user.userLocation;
    const displayEmail = this.context.user.email;

    return (
      <div className="home-page">
        <div className="personal-info">
          <div className="col-two-fifth pic-column">
            <div className="pic-holder">
              <img src="images/b50797c8a7420ba660b2b310f8698811.jpg" />
            </div>
            <h4 className="profile-caption">N/A</h4>
          </div>
          <div className="col-two-fifth info-column">
            <div className="profile-edit-row">
              <h4>Welcome, <span className="display-name">{displayName}</span></h4>
              <button className="profile-edit-button"><i className="fas fa-edit"></i></button>
            </div>
            <h4 className="display-info">Location:</h4>
            <h4>{displayLocation}</h4>
            <h4 className="display-info">Email:</h4>
            <h4>{displayEmail}</h4>
            <h4 className="display-info">Primary Interest:</h4>
            <h4>N/A</h4>
          </div>
        </div>
        <CustomAccordion />
      </div>
    );
  }
}

Home.contextType = AppContext;
