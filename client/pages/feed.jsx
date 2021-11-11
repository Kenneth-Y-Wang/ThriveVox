import React from 'react';

export default class LiveFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false
    };
    this.formOpen = this.formOpen.bind(this);
  }

  formOpen() {
    this.setState({ formOpen: !this.state.formOpen });
  }

  render() {
    return (
      <>
        <div className="col-nine-tenth leave-post-col">
          <h1>Live Feed</h1>
          <button onClick={this.formOpen} type="button">Write a Post</button>
        </div>
        <div className={this.state.formOpen === true ? 'col-nine-tenth post-form-holder form-open' : 'col-nine-tenth post-form-holder'}>
          <form className={this.state.formOpen === true ? 'col-four-fifth post-form' : 'col-four-fifth post-form hidden'}>
            <label htmlFor="title">Post Title</label>
            <input required id="title" name="title" type="text" placeholder="Please enter your post title..."></input>
            <textarea required id="post" name="post" placeholder="Please enter your post..."></textarea>
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
