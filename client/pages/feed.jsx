import React from 'react';
import AppContext from '../lib/app-context';
import { format } from 'date-fns';
import Redirect from '../components/redirect';
import SingleFeed from '../components/single-feed-display';
import Spinner from '../components/spinner';

export default class LiveFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formOpen: false,
      commentView: '',
      title: '',
      post: '',
      refresh: false,
      allPosts: [],
      isDeleting: '',
      isEditing: ''
    };
    this.formOpen = this.formOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.refresh = this.refresh.bind(this);
    this.fileInputRef = React.createRef();
    this.confirmPostDelete = this.confirmPostDelete.bind(this);
    this.confirmPostEdit = this.confirmPostEdit.bind(this);
    this.editPost = this.editPost.bind(this);

  }

  componentDidMount() {
    this.setState({ loading: true });
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
        this.setState({ allPosts: data, loading: false });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh !== this.state.refresh) {
      this.setState({ loading: true });
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
          this.setState({ allPosts: data, loading: false });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  handleComment(postId) {
    if (this.state.commentView === '' || postId !== this.state.commentView) {
      this.setState({ commentView: postId });
    }
    if (postId === this.state.commentView) {
      this.setState({ commentView: '' });
    }

  }

  refresh() {
    this.setState({ refresh: !this.state.refresh });
  }

  formOpen() {
    this.setState({ formOpen: !this.state.formOpen });

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  confirmPostDelete(postId) {
    if (this.state.isDeleting === '' || postId !== this.state.isDeleting) {
      this.setState({ isDeleting: postId });
    }
    if (postId === this.state.isDeleting) {
      this.setState({ isDeleting: '' });
    }
  }

  confirmPostEdit(postId) {
    if (this.state.isEditing === '' || postId !== this.state.isEditing) {
      this.setState({ isEditing: postId });

    }
    if (postId === this.state.isEditing) {
      this.setState({ isEditing: '' });
    }
  }

  handleDelete(postId) {
    const token = window.localStorage.getItem('react-context-jwt');
    fetch(`/api/posts/allPosts/${postId}`, {
      method: 'DELETE',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      },
      body: null
    });

    for (let i = 0; i < this.state.allPosts.length; i++) {
      if (postId === this.state.allPosts[i].postId) {
        const newState = this.state.allPosts.slice(0, i).concat(this.state.allPosts.slice(i + 1));
        this.setState({ allPosts: newState });
        break;
      }

    }
  }

  editPost(data) {
    for (let i = 0; i < this.state.allPosts.length; i++) {
      if (data.postId === this.state.allPosts[i].postId) {
        const { userId, username, email, avaterUrl, userBand, userLocation, createdAt, audioUrl, postId } = this.state.allPosts[i];
        const updatedPost = {
          userId: userId,
          username: username,
          email: email,
          avaterUrl: avaterUrl,
          userBand: userBand,
          userLocation: userLocation,
          title: data.title,
          content: data.content,
          createdAt: createdAt,
          audioUrl: audioUrl,
          postId: postId
        };
        const newState = this.state.allPosts.slice(0, i).concat(updatedPost, this.state.allPosts.slice(i + 1));
        this.setState({ allPosts: newState });
        break;
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');
    const newTime = format(new Date(), 'yyyy-MM-dd HH:mm');

    const form = new FormData();
    form.append('audio', this.fileInputRef.current.files[0]);
    form.append('time', newTime);
    form.append('title', this.state.title);
    form.append('post', this.state.post);

    fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'react-context-jwt': token

      },
      body: form
    })
      .then(response => response.json())
      .catch(error => {
        console.error('error', error);
      });

    this.setState({ title: '', post: '' });
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    const allPosts = this.state.allPosts;
    const postLists = allPosts.map(post => {
      const { postId, email, avaterUrl, username, userBand, userId, userLocation, title, content, createdAt, audioUrl } = post;
      const userLoginId = this.context.user.userId;
      const date = createdAt.slice(0, 10) + ' ' + createdAt.slice(11, 16);

      return (
        <div key={postId}>
          <SingleFeed email={email} avaterUrl={avaterUrl} username={username} userBand={userBand} userId={userId} handleComment={this.handleComment} checkId={this.state.commentView}
            userLocation={userLocation} title={title} content={content} userLoginId={userLoginId} date={date} postId={postId} audioUrl={audioUrl} handleDelete={this.handleDelete} refresh={this.state.refresh}
            isDeleting={this.state.isDeleting} confirmPostDelete={this.confirmPostDelete} confirmPostEdit={this.confirmPostEdit} isEditing={this.state.isEditing} editPost={this.editPost} />
        </div>
      );
    });
    return (
      <>
        <div className="col-nine-tenth leave-post-col">
          <h1>Live Feed</h1>
          <button onClick={this.formOpen} type="button" className="leave-post-button">Write a Post</button>
        </div>
        <div className={this.state.formOpen === true ? 'col-nine-tenth post-form-holder form-open' : 'col-nine-tenth post-form-holder'}>
          <form onSubmit={this.handleSubmit} className={this.state.formOpen === true ? 'col-four-fifth post-form' : 'col-four-fifth post-form hidden'}>
            <label htmlFor="title">Post Title</label>
            <input required onChange={this.handleChange} value={this.state.title} id="title" name="title" type="text" placeholder="Please enter your post title..."></input>
            <textarea required onChange={this.handleChange} value={this.state.post} id="post" name="post" placeholder="Please enter your post..."></textarea>
            <label htmlFor="audio">Post an Aduio File</label>
            <input className="audio-input" id="audio" type="file" name="audio" ref={this.fileInputRef} accept=".wav, .mp3, .m4v, .flac, .aiff, .wma" />
            <div className="post-button-holder">
              <button onClick={this.formOpen} className="user-detail-button mg-r-75 mg-l-75" type="button">BACK</button>
              <button className="user-detail-button mg-r-75 mg-l-75" type="submit">POST</button>
            </div>
          </form>
        </div>
        <div className="section-header">Recent Post <div onClick={this.refresh} className="refresh-feed"><i className="fas fa-sync-alt"></i></div></div>
        <div className="search-result-holder">
          <Spinner loading={this.state.loading} />
          {this.state.allPosts.length !== 0
            ? postLists
            : <h4 className="text-center">Sorry, no recent post available...</h4>}
        </div>
      </>
    );
  }
}

LiveFeeds.contextType = AppContext;
