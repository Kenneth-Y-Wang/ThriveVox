import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Auth from './pages/auth';
import Home from './pages/home';
import NotFound from './pages/not-found';
import CustomDropdown from './components/navbar';
import PageContainer from './components/page-container';
import MainPageContainer from './components/main-page-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      isOpen: false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.switch = this.switch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  switch() {
    if (!this.state.user) {
      alert('Please log-in first');
      return;
    }
    if (event.target.matches('a') === true || event.target.matches('.overlay') === true || event.target.matches('.fas') === true) {
      this.setState(state => ({
        isOpen: !state.isOpen
      }));
    }
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, isOpen } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, isOpen, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <CustomDropdown switch={this.switch} />
          {!user ? <PageContainer>{this.renderPage()}</PageContainer> : <MainPageContainer>{this.renderPage()}</MainPageContainer>}
        </>
      </AppContext.Provider>
    );
  }
}
