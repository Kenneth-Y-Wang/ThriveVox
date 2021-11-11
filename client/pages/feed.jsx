import React from 'react';
import AppContext from '../lib/app-context';
import { format } from 'date-fns';
import Redirect from '../components/redirect';
import SingleFeed from '../components/single-feed-display';

export default class LiveFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      title: '',
      post: '',
      allPosts: []
    };
    this.formOpen = this.formOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    fetch('/api/posts/allPosts', {
      method: 'GET',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      }

    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ allPosts: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  formOpen() {
    this.setState({ formOpen: !this.state.formOpen });

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');
    const newTime = format(new Date(), 'yyyy-MM-dd HH:mm');

    const newPost = {
      title: this.state.title,
      post: this.state.post,
      time: newTime

    };
    fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        console.error('error', error);
      });

    this.setState({ title: '', post: '' });
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    const allPosts = this.state.allPosts;
    const postLists = allPosts.map(post => {
      const { postId, email, avaterUrl, username, userBand, userId, userLocation, title, content, createdAt } = post;
      const userLoginId = this.context.user.userId;
      const date = createdAt.slice(0, 10) + ' ' + createdAt.slice(11, 16);

      return (
        <div key={postId}>
          <SingleFeed email={email} avaterUrl={avaterUrl} username={username} userBand={userBand} userId={userId}
            userLocation={userLocation} title={title} content={content} userLoginId={userLoginId} date={date} />
        </div>
      );
    });
    return (
      <>
        <div className="col-nine-tenth leave-post-col">
          <h1>Live Feed</h1>
          <button onClick={this.formOpen} type="button">Write a Post</button>
        </div>
        <div className={this.state.formOpen === true ? 'col-nine-tenth post-form-holder form-open' : 'col-nine-tenth post-form-holder'}>
          <form onSubmit={this.handleSubmit} className={this.state.formOpen === true ? 'col-four-fifth post-form' : 'col-four-fifth post-form hidden'}>
            <label htmlFor="title">Post Title</label>
            <input required onChange={this.handleChange} value={this.state.title} id="title" name="title" type="text" placeholder="Please enter your post title..."></input>
            <textarea required onChange={this.handleChange} value={this.state.post} id="post" name="post" placeholder="Please enter your post..."></textarea>
            <div className="post-button-holder">
              <button onClick={this.formOpen} className="user-detail-button" type="button">BACK</button>
              <button className="user-detail-button" type="submit">POST</button>
            </div>
          </form>
        </div>
        <div className="section-header">Recent Post</div>
        <div className="search-result-holder">
          {this.state.allPosts.length !== 0
            ? postLists
            : <h4 className="text-center">Sorry, no recent post available...</h4>}
        </div>
      </>
    );
  }
}

LiveFeeds.contextType = AppContext;
