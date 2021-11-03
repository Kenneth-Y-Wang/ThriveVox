import React from 'react';
import AppContext from '../lib/app-context';

export default class CustomAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: '' };
    this.click = this.click.bind(this);
  }

  click() {
    if (this.state.isOpen === event.target.getAttribute('data-id')) {
      this.setState({ isOpen: '' });
    } else {
      this.setState({ isOpen: event.target.getAttribute('data-id') });
    }
  }

  render() {
    const { userStyle, userSkills, userInstruments, userInterest, userBand, userBio } = this.props;
    return (
      <div className="">
        <div >
          <div className="section-header" onClick={this.click} data-id="about-me">About Me</div>
          <div className={this.state.isOpen === 'about-me' ? 'content-holder open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'about-me' ? 'section-content' : 'section-content hidden'}>{userBio || 'Please tell us about your self!'}</div>
          </div>
        </div>
        <div >
          <div className="section-header" onClick={this.click} data-id="skill-style">Skills & Styles</div>
          <div className={this.state.isOpen === 'skill-style' ? 'content-holder skill-open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'skill-style' ? 'skill-content' : 'skill-content hidden'}>
              <div className="col-one-third style-col">
                <h4 className="display-info">My Band:</h4>
                <h4>{userBand || 'I Don\'t Have One..'}</h4>
                <h4 className="display-info">My Instruments:</h4>
                <h4>{userInstruments || 'N/A'}</h4>
              </div>
              <div className="col-half skill-col">
                <h4 className="display-info">My Music Styles:</h4>
                <h4>{userStyle || 'N/A'}</h4>
                <h4 className="display-info">My Skills:</h4>
                <h4>{userSkills || 'N/A'}</h4>
                <h4 className="display-info">My Interest:</h4>
                <h4>{userInterest || 'N/A'}</h4>
              </div>
            </div>
          </div>
        </div>
        <div >
          <div className="section-header" onClick={this.click} data-id="my-favorite">My Favorite</div>
          <div className={this.state.isOpen === 'my-favorite' ? 'content-holder open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'my-favorite' ? 'section-content' : 'section-content hidden'}></div>
          </div>
        </div>
      </div>
    );
  }
}

CustomAccordion.contextType = AppContext;
