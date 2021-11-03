import React from 'react';
import AppContext from '../lib/app-context';

export default class EditForm extends React.Component {

  render() {
    const { avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio } = this.props;
    return (
      <div className="col-three-fifth" >
        <form onSubmit={() => this.props.handleSubmit(event)} className=" edit-page">
          <div className="edit-title"><h1 className="edit-title">Edit Profile</h1></div>
          <label className="edit-label" htmlFor="caption">Profile picture uploads: <span>picture caption</span></label>
          <input onChange={() => this.props.handleChange(event)} className="edit-input" value={avaterCaption} id="caption" type="text" name="caption"></input>
          <input className="image-input" id="image" type="file" name="image" ref={this.props.fileInputRef} accept=".png, .jpg, .jpeg, .gif" />
          <label className="edit-label" htmlFor="style">Your Music Styles: <span>please provide any styles you like</span></label>
          <input onChange={() => this.props.handleChange(event)} className="edit-input" value={userStyle} id="style" type="text" name="style"></input>
          <label className="edit-label" htmlFor="skill">Your Skills: <span>please provide skill type and skill level</span></label>
          <input onChange={() => this.props.handleChange(event)} className="edit-input" value={userSkills} id="skill" type="text" name="skill"></input>
          <label className="edit-label" htmlFor="instrument">Your Instruments: <span>please provide instruments type and any additional info</span></label>
          <input onChange={() => this.props.handleChange(event)} className="edit-input" value={userInstruments} id="instrument" type="text" name="instrument"></input>
          <label className="edit-label" htmlFor="mainInterest">Primary interest: <span>please choose one</span></label>
          <select onChange={() => this.props.handleChange(event)} className="edit-select" value={userPrimaryInterest} id="mainInterest" name="mainInterest">
            <option>Choose One</option>
            <option value="Join existing Band">Join existing Band</option>
            <option value="Hang out with others">Hang out with others</option>
            <option value="Practice with otehrs">Practice with others</option>
            <option value="Songwriting">Songwriting</option>
            <option value="Start new Band">Start new Band</option>
          </select>
          <label className="edit-label" htmlFor="interest">Your Interest: <span>please provide any interest you have</span></label>
          <input onChange={() => this.props.handleChange(event)} className="edit-input" value={userInterest} id="interest" type="text" name="interest"></input>
          <label className="edit-label" htmlFor="band">Your Band: <span>optional</span></label>
          <input onChange={() => this.props.handleChange(event)} className="edit-input" value={userBand} id="band" type="text" name="band"></input>
          <label className="edit-label" htmlFor="about">About you: <span>please let others know about you!</span></label>
          <textarea onChange={() => this.props.handleChange(event)} className="edit-textarea" value={userBio} id="about" type="text" name="about" placeholder="Tell us about you..."></textarea>
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
