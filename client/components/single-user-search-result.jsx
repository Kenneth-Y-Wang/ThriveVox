import React from 'react';

export default class SingleUserResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageView: 'user',
      userPosts: []
    };
    this.changePostView = this.changePostView.bind(this);
    this.changeUserView = this.changeUserView.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    fetch(`/api/posts/allUserPosts/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      }

    })
      .then(response => response.json())
      .then(data => {
        this.setState({ userPosts: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  changePostView() {
    this.setState({ pageView: 'userPost' });
  }

  changeUserView() {
    this.setState({ pageView: 'user' });
  }

  render() {
    const allUserPosts = this.state.userPosts;
    const postLists = allUserPosts.map(post => {
      const { postId, title, content, createdAt, audioUrl } = post;
      const date = createdAt.slice(0, 10) + ' ' + createdAt.slice(11, 16);
      return (
        <div key={postId} className="col-four-fifth user-post-holder">
          <h4>Post Title: <span className="user-post-span">{title}</span></h4>
          <h4>Post Date: <span className="user-post-span">{date}</span></h4>
          <p>{content}</p>
          <div>
            {audioUrl ? <audio src={audioUrl} controls /> : <div></div>}
          </div>
        </div>
      );
    });
    const emailHref = `mailto:${this.props.email}`;
    return (
      <div className=" col-nine-tenth single-user-search-holder">
        <div className="col-two-fifth search-profile-pic-col">
         <div className="profile-pic-holder"><img src={this.props.avaterUrl || '/images/b50797c8a7420ba660b2b310f8698811.jpg'} /></div>
        </div>
        <div className="col-three-fifth search-user-info-col">
          <div className="name-detail-row">
            <h3 >{this.props.username}<span id="user-band"> [ Band: {!this.props.userBand || this.props.userBand === 'null' ? 'N/A' : this.props.userBand} ]</span></h3>
            <button onClick={() => this.props.detailView(this.props.userId)} className=" user-detail-button" type='button'>Detail</button>
          </div>
          <h3 className="user-info-text">Location:<span> {this.props.userLocation}</span></h3>
          <h3 className="user-info-text">Primary Interest:<span> {this.props.userPrimaryInterest || 'N/A'}</span></h3>
          <h3 className="user-info-text">Styles:<span> {this.props.userStyle || 'N/A'}</span></h3>
          <h3 className="user-info-text">Skills:<span> {this.props.userSkills || 'N/A'}</span></h3>
          <h3 className="user-info-text">Email:
           <span> <a className="email-link" target="_blank" rel="noopener noreferrer" href={emailHref}>{this.props.email}</a></span>
          </h3>
        </div>
        <div className={this.props.detailShowing === this.props.userId ? 'detail-modal-holder' : 'detail-modal-holder hidden'}>
            <div className="col-three-fifth detail-block">
              <div className={this.state.pageView === 'user' ? '' : 'hidden'}>
                <h3>About Me</h3>
                <div className="about-me-holder">
                  {this.props.userBio || "We don't know that much about him/her..."}
                </div>
                <h4>My Instruments</h4>
                <h5>{this.props.userInstruments || 'N/A'}</h5>
                <h4>My Interests</h4>
                <h5>{this.props.userInterest || 'N/A'}</h5>
                <h4>Contact Me:</h4>
                <a className="email-link" target="_blank" rel="noopener noreferrer" href={emailHref}>{this.props.email}</a>
              </div>
              <div className={this.state.pageView === 'userPost' ? 'user-postview' : 'user-postview hidden'}>
                <h3>User Posts</h3>
                {this.state.userPosts.length !== 0
                  ? postLists
                  : <h4 className="text-center">Sorry, no recent post available...</h4>}
              </div>
              <div className="user-info-button-holder">
                <button onClick={this.changePostView} className={this.state.pageView === 'userPost' ? 'user-detail-button detail-block-button view-chosen' : 'user-detail-button detail-block-button'}>User Posts</button>
                <button onClick={() => this.props.goBack(this.props.userId)} className="user-detail-button detail-block-button">Back</button>
                <button onClick={this.changeUserView} className={this.state.pageView === 'user' ? 'user-detail-button detail-block-button view-chosen' : 'user-detail-button detail-block-button'}>User Detail</button>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
