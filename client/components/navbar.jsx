import React from 'react';
import AppContext from '../lib/app-context';

export default class CustomDropdown extends React.Component {
  render() {
    const { user, isOpen, handleSignOut } = this.context;
    const userButton = user !== null
      ? <a className="chat" onClick={handleSignOut}><i className="fas fa-sign-out-alt"></i></a>
      : <a href="#sign-in" className="chat" ><i className="fas fa-user"></i></a>;
    return (
      <nav className="nav-bar">
        <div className={!isOpen ? ' overlay hidden' : 'overlay modal-on'} onClick={!isOpen ? null : () => this.props.switch()}></div>
        <header className="logo-container">
          <div onClick={() => this.props.switch()} className="switch"><i className="fas fa-bars"></i></div>
          <a className="no-dec" href="#"><h1 className="logo">ThriveVox</h1></a>
          {userButton}
        </header>
        <div className={!isOpen ? 'menu' : ' menu menu-on'} onClick={!isOpen ? null : () => this.props.switch()}>
          <h1 className="menu-text">Menu</h1>
          <a className="tab-anc">About Me</a>
        </div>
      </nav>
    );
  }
}

CustomDropdown.contextType = AppContext;
