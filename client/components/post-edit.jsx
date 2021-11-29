import React from 'react';

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      post: ''
    };
  }

  render() {
    return (
      <div className={this.props.isEditing === this.props.postId ? 'detail-modal-holder' : 'detail-modal-holder hidden'}>
       <div>hello</div>
      </div>
    );
  }
}
