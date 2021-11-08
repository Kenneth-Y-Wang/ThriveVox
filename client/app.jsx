import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Auth from './pages/auth';
import Home from './pages/home';
import NotFound from './pages/not-found';
import CustomDropdown from './components/navbar';
import PageContainer from './components/page-container';
import FavoriteSearch from './pages/favorite';
import ChatEntrance from './pages/chat-entrance';
import ChatMain from './pages/chat-page';

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
    const { path, params } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'favorite') {
      return <FavoriteSearch />;
    }
    if (path === 'chat') {
      return <ChatEntrance />;
    }
    if (path === 'chatRoom') {
      const roomName = params.get('roomName');
      return <ChatMain roomName={roomName} />;
    }
    return <NotFound />;
  }

  render() {
    const { path } = this.state.route;
    if (this.state.isAuthorizing) return null;
    const { user, route, isOpen } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, isOpen, handleSignIn, handleSignOut };
    const containerClass = !user || path === 'chat' || path === 'chatRoom'
      ? 'container-sign-in'
      : 'container';

    return (
      <AppContext.Provider value={contextValue}>
        <>
          <CustomDropdown />
          <PageContainer containerClass={containerClass}>
            {this.renderPage()}
            </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
