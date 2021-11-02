import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const weclomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
    return (
      <div className="auth-display ">
        <div className="col-four-fifth">
          <header className="form-header">
            <h2 className="">

              Welcome, Music Lovers!
            </h2>
            <p className="return-message">{weclomeMessage}</p>
          </header>
          <div className="col-three-fifth form-holder ">
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
