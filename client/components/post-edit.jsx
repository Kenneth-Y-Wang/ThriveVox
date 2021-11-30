import React from 'react';

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      post: this.props.content
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');

    fetch(`/api/posts/editPost/${this.props.postId}`, {
      method: 'PATCH',
      headers: {
        'react-context-jwt': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(data => {
        this.props.editPost(data);
      })
      .catch(error => {
        console.error('error', error);
      });
    this.props.confirmPostEdit(this.props.postId);
  }

  render() {
    return (
      <div className={this.props.isEditing === this.props.postId ? 'detail-modal-holder' : 'detail-modal-holder hidden'}>
       <div className="detail-block col-two-fifth">
         <form onSubmit={this.handleSubmit} className="edit-form">
          <h1>Edit Post</h1>
          <label htmlFor="edit-title">Post Title</label>
          <input onChange={this.handleChange} value={this.state.title} id="edit-title" name="title" type="text"></input>
          <textarea onChange={this.handleChange} value={this.state.post} name="post"></textarea>
          <div className="post-button-holder">
            <button onClick={() => this.props.confirmPostEdit(this.props.postId)} className="user-detail-button mg-r-75 mg-l-75" type="button">BACK</button>
            <button className="user-detail-button mg-r-75 mg-l-75" type="submit">SAVE</button>
          </div>
         </form>
       </div>
      </div>
    );
  }
}
