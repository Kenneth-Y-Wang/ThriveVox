import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import CustomAccordion from '../components/accordion';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      style: '',
      skill: '',
      instrument: '',
      mainInterest: '',
      interest: '',
      band: '',
      about: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInputRef = React.createRef();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const userId = this.context.user.userId;
    event.preventDefault();
    console.log(this.state);
    const form = new FormData();

    form.append('image', this.fileInputRef.current.files[0]);

    fetch(`/api/profile/uploads/${userId}`, {
      method: 'PATCH',
      body: form
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.fileInputRef.current.value = null;
      })
      .catch(error => {
        console.error('error', error);
      });
    event.target.reset();
  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;
    const displayName = this.context.user.username;
    const displayLocation = this.context.user.userLocation;
    const displayEmail = this.context.user.email;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="home-page">
        <div className="edit-page-holder">
          <form onSubmit={handleSubmit} className="col-three-fifth edit-page">
            <div className="edit-title"><h1 className="edit-title">Edit Profile</h1></div>
            <label className="edit-label" htmlFor="caption">Profile picture uploads: <span>picture caption</span></label>
            <input onChange={handleChange} className="edit-input" id="caption" type="text" name="caption"></input>
            <input className="image-input" id="image" type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif" />
            <label className="edit-label" htmlFor="style">Your Music Styles: <span>please provide any styles you like</span></label>
            <input onChange={handleChange} className="edit-input" id="style" type="text" name="style"></input>
            <label className="edit-label" htmlFor="skill">Your Skills: <span>please provide skill type and skill level</span></label>
            <input onChange={handleChange} className="edit-input" id="skill" type="text" name="skill"></input>
            <label className="edit-label" htmlFor="instrument">Your Instruments: <span>please provide instruments type and any additional info</span></label>
            <input onChange={handleChange} className="edit-input" id="instrument" type="text" name="instrument"></input>
            <label className="edit-label" htmlFor="mainInterest">Primary interest: <span>please choose one</span></label>
            <select onChange={handleChange} className="edit-select" id="mainInterest" name="mainInterest">
              <option>Choose One</option>
              <option value="Join existing Band">Join existing Band</option>
              <option value="Hang out with others">Hang out with others</option>
              <option value="Practice with otehrs">Practice with others</option>
              <option value="Songwriting">Songwriting</option>
              <option value="Start new Band">Start new Band</option>
            </select>
            <label className="edit-label" htmlFor="interest">Your Interest: <span>please provide any interest you have</span></label>
            <input onChange={handleChange} className="edit-input" id="interest" type="text" name="interest"></input>
            <label className="edit-label" htmlFor="band">Your Band: <span>optional</span></label>
            <input onChange={handleChange} className="edit-input" id="band" type="text" name="band"></input>
            <label className="edit-label" htmlFor="about">About you: <span>please let others know about you!</span></label>
            <textarea onChange={handleChange} className="edit-textarea" id="about" type="text" name="about" placeholder="Tell us about you..."></textarea>
            <div className="row justify-center"><button type="submit" className=" edit-button">SAVE</button></div>
          </form>
        </div>
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
