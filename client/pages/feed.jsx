import React from 'react';
import AppContext from '../lib/app-context';

export default class LiveFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      title: '',
      post: ''
    };
    this.formOpen = this.formOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

    const newPost = {
      title: this.state.title,
      post: this.state.post

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
          <h4 className="text-center">Sorry, no recent post available...</h4>
          <div className=" col-nine-tenth single-user-search-holder">
            <div className="col-two-fifth search-profile-pic-col">
              <div className="profile-pic-holder"><img src='/images/b50797c8a7420ba660b2b310f8698811.jpg' /></div>
            </div>
            <div className="col-three-fifth search-user-info-col">
              <div className="name-detail-row">
                <h3 className="post-user">KennethW<span id="band-name"> [ Band: LearningFuze ]</span></h3>
                <button className=" user-detail-button comment-button" type='button'>Comment</button>
              </div>
              <h3 className="user-info-text">Location:<span> Irvine</span></h3>
              <h3 className="user-info-text">Email:
                <span> <a className="email-link" target="_blank" rel="noopener noreferrer" >YunfeiW@me.com</a></span>
              </h3>
              <h3 className="user-info-text">Post Title: <span>Looking for a drummer!</span></h3>
              <p className="post-text">Looking for a drummer for our band, we gather twice a week for practice. looking for fun member! please contact me if you are interested</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

LiveFeeds.contextType = AppContext;
