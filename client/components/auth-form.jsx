// import React from 'react';

// export default class AuthForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       email: '',
//       location: '',
//       errorSignIn: false
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.demoLogin = this.demoLogin.bind(this);
//   }

//   demoLogin() {
//     this.setState({ username: 'demouser', password: '11111' });
//   }

//   handleChange(event) {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const { action } = this.props;
//     const req = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(this.state)
//     };
//     fetch(`/api/auth/${action}`, req)
//       .then(res => res.json())
//       .then(result => {
//         if (action === 'sign-up') {
//           window.location.hash = 'sign-in';
//         } else if (result.user && result.token) {
//           this.setState({ errorSignIn: false });
//           this.props.onSignIn(result);
//         } else {
//           this.setState({ errorSignIn: true });
//         }
//       });
//   }

//   render() {
//     const { action } = this.props;
//     const { handleChange, handleSubmit } = this;
//     const alternateActionHref = action === 'sign-up'
//       ? '#sign-in'
//       : '#sign-up';
//     const alternatActionText = action === 'sign-up'
//       ? 'Sign in instead'
//       : 'Register now';
//     const submitButtonText = action === 'sign-up'
//       ? 'Register'
//       : 'Log In';
//     return (
//       <form className="sign-in-form" onSubmit={handleSubmit}>
//         <div className="result-button-row">
//          <button onClick={this.demoLogin} className={action === 'sign-in' ? 'demo-login' : 'demo-login hidden'}>Demo Login</button>
//         </div>
//         <div className="mg-b-1">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             required
//             autoFocus
//             id="username"
//             type="text"
//             name="username"
//             onChange={handleChange}
//             className="sign-in-input"
//             value={this.state.username}
//           />
//         </div>
//         <div className="mg-b-1">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             required
//             id="password"
//             type="password"
//             name="password"
//             onChange={handleChange}
//             className="sign-in-input"
//             value={this.state.password} />
//         </div>
//         <div className={action === 'sign-up' ? 'mg-b-1' : 'mg-b-1 hidden'}>
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             onChange={handleChange}
//             className="sign-in-input"
//             value={this.state.email} />
//         </div>
//         <div className={action === 'sign-up' ? 'mg-b-1' : 'mg-b-1 hidden'}>
//           <label htmlFor="Location" className="form-label">
//             Location
//           </label>
//           <input
//             id="location"
//             type="text"
//             name="location"
//             onChange={handleChange}
//             className="sign-in-input"
//             value={this.state.location} />
//         </div>
//         <div className="sign-in-error-row">
//           <h5 className={this.state.errorSignIn ? 'sign-in-error' : 'sign-in-error hidden'} >Incorrect username or password, please try again</h5>
//         </div>
//         <div className="form-submit-row">
//           <small>
//             <a className="return-message" href={alternateActionHref}>
//               {alternatActionText}
//             </a>
//           </small>
//           <button type="submit" className="button-main">
//             {submitButtonText}
//           </button>
//         </div>
//       </form>
//     );
//   }
// }

import * as React from 'react';
import { useState } from 'react';

const AuthForm = ({ action, onSignIn }) => {

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
    email: '',
    location: ''
  });

  const [errorSignIn, setErrorSignin] = useState(false);

  const demoLogin = () => {
    setUserInput(prestate => ({
      ...prestate,
      username: 'demouser',
      password: '11111'
    }));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInput(prestate => ({
      ...prestate,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/auth/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      });
      const result = await response.json();
      if (action === 'sign-up') {
        window.location.hash = 'sign-in';
      } else if (result.user && result.token) {
        setErrorSignin(false);
        onSignIn(result);
      } else {
        setErrorSignin(true);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const alternateActionHref = action === 'sign-up'
    ? '#sign-in'
    : '#sign-up';
  const alternatActionText = action === 'sign-up'
    ? 'Sign in instead'
    : 'Register now';
  const submitButtonText = action === 'sign-up'
    ? 'Register'
    : 'Log In';

  return (
  <form className="sign-in-form" onSubmit={handleSubmit}>
    <div className="result-button-row">
      <button onClick={demoLogin} className={action === 'sign-in' ? 'demo-login' : 'demo-login hidden'}>Demo Login</button>
    </div>
    <div className="mg-b-1">
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <input
        required
        autoFocus
        id="username"
        type="text"
        name="username"
        onChange={handleChange}
        className="sign-in-input"
        value={userInput.username}
      />
    </div>
    <div className="mg-b-1">
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        required
        id="password"
        type="password"
        name="password"
        onChange={handleChange}
        className="sign-in-input"
        value={userInput.password} />
    </div>
    <div className={action === 'sign-up' ? 'mg-b-1' : 'mg-b-1 hidden'}>
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        onChange={handleChange}
        className="sign-in-input"
        value={userInput.email} />
    </div>
    <div className={action === 'sign-up' ? 'mg-b-1' : 'mg-b-1 hidden'}>
      <label htmlFor="Location" className="form-label">
        Location
      </label>
      <input
        id="location"
        type="text"
        name="location"
        onChange={handleChange}
        className="sign-in-input"
        value={userInput.location} />
    </div>
    <div className="sign-in-error-row">
      <h5 className={errorSignIn ? 'sign-in-error' : 'sign-in-error hidden'} >Incorrect username or password, please try again</h5>
    </div>
    <div className="form-submit-row">
      <small>
        <a className="return-message" href={alternateActionHref}>
          {alternatActionText}
        </a>
      </small>
      <button type="submit" className="button-main">
        {submitButtonText}
      </button>
    </div>
  </form>
  );
};

export default AuthForm;
