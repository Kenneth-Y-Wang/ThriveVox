import React from 'react';

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

    return (
      <div className="">
        <div >
          <div className="section-header" onClick={this.click} data-id="about-me">About Me</div>
          <div className={this.state.isOpen === 'about-me' ? 'content-holder open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'about-me' ? 'section-content' : 'section-content hidden'}></div>
          </div>
        </div>
        <div >
          <div className="section-header" onClick={this.click} data-id="skill-style">Skills & Styles</div>
          <div className={this.state.isOpen === 'skill-style' ? 'content-holder open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'skill-style' ? 'section-content' : 'section-content hidden'}></div>
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
