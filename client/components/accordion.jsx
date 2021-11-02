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
            <div className={this.state.isOpen === 'about-me' ? 'section-content' : 'section-content hidden'}>Jimin has been playing her music mainly with her group Jimin Lee Quartet featuring Eunyoung Kim on piano, Seungho Jang on bass, and Junyoung Song on drums. She’s also singing standard jazz repertoire with some of the finest jazz musicians in Seoul and making a wide spectrum of music for albums and concerts</div>
          </div>
        </div>
        <div >
          <div className="section-header" onClick={this.click} data-id="skill-style">Skills & Styles</div>
          <div className={this.state.isOpen === 'skill-style' ? 'content-holder skill-open' : 'content-holder close'}>
            <div className={this.state.isOpen === 'skill-style' ? 'skill-content' : 'skill-content hidden'}>
              <div className="col-one-third style-col">
                <h4 className="display-info">My Band:</h4>
                <h4>N/A</h4>
                <h4 className="display-info">My Instruments:</h4>
                <h4>Guitar(Electric) Pacifica Series PAC 112J</h4>
              </div>
              <div className="col-half skill-col">
                <h4 className="display-info">My Music Styles:</h4>
                <h4>Classical, Country, Pop, R&B</h4>
                <h4 className="display-info">My Skills:</h4>
                <h4>Guitar(Electric), Bass(Electric), Vocal(Advanced)</h4>
                <h4 className="display-info">My Interest:</h4>
                <h4>Hang out with others, study with others, practice with others</h4>
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
