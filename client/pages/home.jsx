import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import CustomAccordion from '../components/accordion';
import EditForm from '../components/edit-form';

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
      about: '',
      profileUrl: '',
      isEditing: false

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInputRef = React.createRef();
    this.clickToEdit = this.clickToEdit.bind(this);
  }

  componentDidMount() {
    if (this.context.user) {

      const userId = this.context.user.userId;
      fetch(`/api/profile/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          const { avaterUrl, avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio } = data;
          this.setState({
            caption: avaterCaption,
            style: userStyle,
            skill: userSkills,
            instrument: userInstruments,
            mainInterest: userPrimaryInterest,
            interest: userInterest,
            band: userBand,
            about: userBio,
            profileUrl: avaterUrl
          });

        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  clickToEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const userId = this.context.user.userId;
    event.preventDefault();
    // console.log(this.state);
    const { caption, style, skill, instrument, mainInterest, interest, band, about } = this.state;
    const userInfo = {
      caption: caption,
      style: style,
      skill: skill,
      instrument: instrument,
      mainInterest: mainInterest,
      interest: interest,
      band: band,
      about: about
    };
    // console.log(userInfo);

    const form = new FormData();

    fetch(`/api/profile/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(data => {
        const { avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio } = data;
        this.setState({
          caption: avaterCaption,
          style: userStyle,
          skill: userSkills,
          instrument: userInstruments,
          mainInterest: userPrimaryInterest,
          interest: userInterest,
          band: userBand,
          about: userBio
        });
        // console.log('after update:', this.state);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    if (this.fileInputRef.current.value) {
      form.append('image', this.fileInputRef.current.files[0]);

      fetch(`/api/profile/uploads/${userId}`, {
        method: 'PATCH',
        body: form
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ profileUrl: data.avaterUrl });
          // console.log('image', data);
          this.fileInputRef.current.value = null;
        })
        .catch(error => {
          console.error('error', error);
        });
    }
    this.clickToEdit();
  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;
    const displayName = this.context.user.username;
    const displayLocation = this.context.user.userLocation;
    const displayEmail = this.context.user.email;
    const { caption, style, skill, instrument, mainInterest, interest, band, about, profileUrl } = this.state;
    const { handleChange, handleSubmit, clickToEdit } = this;

    return (
      <div className="home-page">
        <div className={this.state.isEditing ? 'edit-page-holder' : 'edit-page-holder hidden'}>
          < EditForm handleSubmit={handleSubmit} handleChange={handleChange} fileInputRef={this.fileInputRef} clickToEdit={clickToEdit}
            avaterCaption={caption} userStyle={style} userSkills={skill} userInstruments={instrument}
            userPrimaryInterest={mainInterest} userInterest={interest} userBand={band} userBio={about} />
        </div>
        <div className="personal-info">
          <div className="col-two-fifth pic-column">
            <div className="pic-holder">
              <img src={profileUrl || '/images/b50797c8a7420ba660b2b310f8698811.jpg'} />
            </div>
            <h4 className="profile-caption">{caption || 'Update Your Pic!'}</h4>
          </div>
          <div className="col-two-fifth info-column">
            <div className="profile-edit-row">
              <h4>Welcome, <span className="display-name">{displayName}</span></h4>
              <button className="profile-edit-button"><i onClick={this.clickToEdit} className="fas fa-edit"></i></button>
            </div>
            <h4 className="display-info">Location:</h4>
            <h4>{displayLocation}</h4>
            <h4 className="display-info">Email:</h4>
            <h4>{displayEmail}</h4>
            <h4 className="display-info">Primary Interest:</h4>
            <h4>{mainInterest || 'N/A'}</h4>
          </div>
        </div>
        <CustomAccordion userStyle={style} userSkills={skill} userInstruments={instrument} userInterest={interest} userBand={band} userBio={about}/>
      </div>
    );
  }
}

Home.contextType = AppContext;
