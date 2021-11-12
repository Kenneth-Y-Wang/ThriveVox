import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import CustomAccordion from '../components/accordion';
import EditForm from '../components/edit-form';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      isEditing: false

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickToEdit = this.clickToEdit.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) {
      return;
    }

    const userId = this.context.user.userId;
    fetch(`/api/profile/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {

        this.setState({
          userData: data
        });

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  clickToEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleSubmit(data) {

    // event.preventDefault();
    this.setState({ userData: data });

    this.clickToEdit();
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    if (!this.state.userData) return null;
    const displayName = this.context.user.username;
    const displayLocation = this.context.user.userLocation;
    const displayEmail = this.context.user.email;
    const { avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio, avaterUrl } = this.state.userData;
    const { handleSubmit, clickToEdit } = this;

    return (
      <div className="home-page">
        <div className={this.state.isEditing ? 'edit-page-holder' : 'edit-page-holder hidden'}>
          < EditForm userInfo={this.state.userData} onSubmit={handleSubmit} clickToEdit={clickToEdit} />
        </div>
        <div className="personal-info">
          <div className="col-two-fifth pic-column">
            <div className="pic-holder">
              <img src={avaterUrl || '/images/b50797c8a7420ba660b2b310f8698811.jpg'} />
            </div>
            <h4 className="profile-caption">{avaterCaption || 'Update Your Pic!'}</h4>
          </div>
          <div className="col-two-fifth info-column">
            <div className="profile-edit-row">
              <h4>Welcome, <span className="display-name">{displayName}</span></h4>
              <button className="profile-edit-button"><i onClick={this.clickToEdit} className="fas fa-edit"></i></button>
            </div>
            <h4 className="display-info">Location:</h4>
            <h4 className="display-info-detail">{displayLocation.toUpperCase()}</h4>
            <h4 className="display-info">Email:</h4>
            <h4 className="display-info-detail">{displayEmail}</h4>
            <h4 className="display-info">Primary Interest:</h4>
            <h4 className="display-info-detail">{userPrimaryInterest || 'N/A'}</h4>
          </div>
        </div>
        <CustomAccordion userStyle={userStyle} userSkills={userSkills} userInstruments={userInstruments} userInterest={userInterest} userBand={userBand} userBio={userBio} />
      </div>
    );
  }
}

Home.contextType = AppContext;
