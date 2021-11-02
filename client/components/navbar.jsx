import React from 'react';
import AppContext from '../lib/app-context';

export default class CustomDropdown extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    const userButton = user !== null
      ? <a className="exit" onClick={handleSignOut}><i className="fas fa-sign-out-alt"></i></a>
      : <a href="#sign-in" className="exit" ><i className="fas fa-user"></i></a>;
    return (
      <nav className="nav-bar">
        <div ></div>
        <header className="logo-container">
          <div ></div>
          <a className="no-dec" href="#"><h1 className="logo">ThriveVox</h1></a>
          {userButton}
        </header>
      </nav>
    );
  }
}

CustomDropdown.contextType = AppContext;
