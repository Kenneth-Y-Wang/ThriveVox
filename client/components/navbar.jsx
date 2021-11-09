import React from 'react';
import AppContext from '../lib/app-context';

export default class CustomDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.switch = this.switch.bind(this);
  }

  switch() {

    if (event.target.matches('a') || event.target.matches('.overlay') || event.target.matches('.fas')) {
      this.setState(state => ({
        isOpen: !state.isOpen
      }));
    }
  }

  render() {
    const { user, handleSignOut } = this.context;
    const { isOpen } = this.state;
    const userButton = user !== null
      ? <a className="exit" onClick={handleSignOut}><i className="fas fa-sign-out-alt"></i></a>
      : <a href="#sign-in" className="exit" ><i className="fas fa-user"></i></a>;
    return (
      <nav className="nav-bar">
        <div className={!isOpen ? ' overlay hidden' : 'overlay modal-on'} onClick={this.switch}></div>
        <header className="logo-container">
          <div className="switch"><i onClick={this.switch} className="fas fa-bars"></i></div>
          <a className="no-dec" href="#"><h1 className="logo">ThriveVox</h1></a>
          {userButton}
        </header>
        <div className={!isOpen ? 'menu' : ' menu menu-on'} onClick={this.switch}>
          <h1 className="menu-text">Menu</h1>
          <a href="#" className="tab-anc">About Me</a>
          <a href="#favorite" className="tab-anc">My Favorite</a>
          <a href="#chat" className="tab-anc">Let&apos;s Chat</a>
        </div>
      </nav>
    );
  }
}

CustomDropdown.contextType = AppContext;
