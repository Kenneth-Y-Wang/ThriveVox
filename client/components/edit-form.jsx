import React from 'react';
import AppContext from '../lib/app-context';

export default class EditForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.userInfo;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInputRef = React.createRef();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = new FormData();
    form.append('image', this.fileInputRef.current.files[0]);
    form.append('avaterCaption', this.state.avaterCaption);
    form.append('userStyle', this.state.userStyle);
    form.append('userSkills', this.state.userSkills);
    form.append('userInstruments', this.state.userInstruments);
    form.append('userPrimaryInterest', this.state.userPrimaryInterest);
    form.append('userInterest', this.state.userInterest);
    form.append('userBand', this.state.userBand);
    form.append('userBio', this.state.userBio);

    const token = window.localStorage.getItem('react-context-jwt');
    fetch('/api/profile/users', {
      method: 'PATCH',
      headers: {
        'react-context-jwt': token
      },
      body: form
    })
      .then(response => response.json())
      .then(data => {
        this.props.onSubmit(data);

        this.fileInputRef.current.value = null;
      })
      .catch(error => {
        console.error('error', error);
      });

  }

  render() {
    const { avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio } = this.state;
    return (
      <div className="col-three-fifth" >
        <form onSubmit={this.handleSubmit} className=" edit-page">
          <div className="edit-title"><h1 className="edit-title">Edit Profile</h1></div>
          <label className="edit-label" htmlFor="caption">Profile picture uploads: <span>picture caption</span></label>
          <input onChange={this.handleChange} className="edit-input" value={avaterCaption} id="caption" type="text" name="avaterCaption"></input>
          <input className="image-input" id="image" type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif" />
          <label className="edit-label" htmlFor="style">Your Music Styles: <span>please provide any styles you like</span></label>
          <input onChange={this.handleChange} className="edit-input" value={userStyle} id="style" type="text" name="userStyle"></input>
          <label className="edit-label" htmlFor="skill">Your Skills: <span>please provide skill type and skill level</span></label>
          <input onChange={this.handleChange} className="edit-input" value={userSkills} id="skill" type="text" name="userSkills"></input>
          <label className="edit-label" htmlFor="instrument">Your Instruments: <span>please provide instruments type and any additional info</span></label>
          <input onChange={this.handleChange} className="edit-input" value={userInstruments} id="instrument" type="text" name="userInstruments"></input>
          <label className="edit-label" htmlFor="mainInterest">Primary interest: <span>please choose one</span></label>
          <select onChange={this.handleChange} className="edit-select" value={userPrimaryInterest} id="mainInterest" name="userPrimaryInterest">
            <option>Choose One</option>
            <option value="Join existing Band">Join existing Band</option>
            <option value="Hang out with others">Hang out with others</option>
            <option value="Practice with otehrs">Practice with others</option>
            <option value="Songwriting">Songwriting</option>
            <option value="Start new Band">Start new Band</option>
          </select>
          <label className="edit-label" htmlFor="interest">Your Interest: <span>please provide any interest you have</span></label>
          <input onChange={this.handleChange} className="edit-input" value={userInterest} id="interest" type="text" name="userInterest"></input>
          <label className="edit-label" htmlFor="band">Your Band: <span>optional</span></label>
          <input onChange={this.handleChange} className="edit-input" value={userBand} id="band" type="text" name="userBand"></input>
          <label className="edit-label" htmlFor="about">About you: <span>please let others know about you!</span></label>
          <textarea onChange={this.handleChange} className="edit-textarea" value={userBio} id="about" type="text" name="userBio" placeholder="Tell us about you..."></textarea>
          <div className="row justify-center">
            <button type="button" className=" edit-button" onClick={() => this.props.clickToEdit()}>CANCEL</button>
            <button type="submit" className=" edit-button">SAVE</button>
          </div>
        </form>
      </div>
    );
  }
}

EditForm.contextType = AppContext;
