import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import CustomAccordion from '../components/accordion';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      style: '',
      skill: '',
      instrument: '',
      mainInterest: '',
      interest: '',
      band: '',
      about: '',
      profileUrl: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInputRef = React.createRef();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const userId = this.context.user.userId;
    event.preventDefault();
    console.log(this.state);
    const { caption, style, skill, instrument, mainInterest, interest, band, about } = this.state;
    const userInfo = {
      caption: caption,
      style: style,
      skill: skill,
      instrument: instrument,
      mainInterest: mainInterest,
      interest: interest,
      band: band,
      about: about
    };
    console.log(userInfo);

    const form = new FormData();

    fetch(`/api/profile/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(data => {
        const { avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio } = data;
        this.setState({
          caption: avaterCaption,
          style: userStyle,
          skill: userSkills,
          instrument: userInstruments,
          mainInterest: userPrimaryInterest,
          interest: userInterest,
          band: userBand,
          about: userBio
        });
        console.log('after update:', this.state);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    if (this.fileInputRef.current.value) {
      form.append('image', this.fileInputRef.current.files[0]);

      fetch(`/api/profile/uploads/${userId}`, {
        method: 'PATCH',
        body: form
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ profileUrl: data.avaterUrl });
          console.log('image', data);
          this.fileInputRef.current.value = null;
        })
        .catch(error => {
          console.error('error', error);
        });
    }

  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;
    const displayName = this.context.user.username;
    const displayLocation = this.context.user.userLocation;
    const displayEmail = this.context.user.email;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="home-page">
        <div className="edit-page-holder">
          <form onSubmit={handleSubmit} className="col-three-fifth edit-page">
            <div className="edit-title"><h1 className="edit-title">Edit Profile</h1></div>
            <label className="edit-label" htmlFor="caption">Profile picture uploads: <span>picture caption</span></label>
            <input onChange={handleChange} className="edit-input" id="caption" type="text" name="caption"></input>
            <input className="image-input" id="image" type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif" />
            <label className="edit-label" htmlFor="style">Your Music Styles: <span>please provide any styles you like</span></label>
            <input onChange={handleChange} className="edit-input" id="style" type="text" name="style"></input>
            <label className="edit-label" htmlFor="skill">Your Skills: <span>please provide skill type and skill level</span></label>
            <input onChange={handleChange} className="edit-input" id="skill" type="text" name="skill"></input>
            <label className="edit-label" htmlFor="instrument">Your Instruments: <span>please provide instruments type and any additional info</span></label>
            <input onChange={handleChange} className="edit-input" id="instrument" type="text" name="instrument"></input>
            <label className="edit-label" htmlFor="mainInterest">Primary interest: <span>please choose one</span></label>
            <select onChange={handleChange} className="edit-select" id="mainInterest" name="mainInterest">
              <option>Choose One</option>
              <option value="Join existing Band">Join existing Band</option>
              <option value="Hang out with others">Hang out with others</option>
              <option value="Practice with otehrs">Practice with others</option>
              <option value="Songwriting">Songwriting</option>
              <option value="Start new Band">Start new Band</option>
            </select>
            <label className="edit-label" htmlFor="interest">Your Interest: <span>please provide any interest you have</span></label>
            <input onChange={handleChange} className="edit-input" id="interest" type="text" name="interest"></input>
            <label className="edit-label" htmlFor="band">Your Band: <span>optional</span></label>
            <input onChange={handleChange} className="edit-input" id="band" type="text" name="band"></input>
            <label className="edit-label" htmlFor="about">About you: <span>please let others know about you!</span></label>
            <textarea onChange={handleChange} className="edit-textarea" id="about" type="text" name="about" placeholder="Tell us about you..."></textarea>
            <div className="row justify-center"><button type="submit" className=" edit-button">SAVE</button></div>
          </form>
        </div>
        <div className="personal-info">
          <div className="col-two-fifth pic-column">
            <div className="pic-holder">
              <img src="images/b50797c8a7420ba660b2b310f8698811.jpg" />
            </div>
            <h4 className="profile-caption">N/A</h4>
          </div>
          <div className="col-two-fifth info-column">
            <div className="profile-edit-row">
              <h4>Welcome, <span className="display-name">{displayName}</span></h4>
              <button className="profile-edit-button"><i className="fas fa-edit"></i></button>
            </div>
            <h4 className="display-info">Location:</h4>
            <h4>{displayLocation}</h4>
            <h4 className="display-info">Email:</h4>
            <h4>{displayEmail}</h4>
            <h4 className="display-info">Primary Interest:</h4>
            <h4>N/A</h4>
          </div>
        </div>
        <CustomAccordion />
      </div>
    );
  }
}

Home.contextType = AppContext;

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: [],
//       editTodo: null
//     };
//     this.addTodo = this.addTodo.bind(this);
//     this.toggleCompleted = this.toggleCompleted.bind(this);
//     this.toDelete = this.toDelete.bind(this);
//     this.toEdit = this.toEdit.bind(this);
//     this.editChange = this.editChange.bind(this);
//     this.editSubmit = this.editSubmit.bind(this);
//     this.toCancel = this.toCancel.bind(this);
//   }

//   componentDidMount() {
//     /**
//      * Use fetch to send a GET request to `/api/todos`.
//      * Then 😉, once the response JSON is received and parsed,
//      * update state with the received todos.
//      */
//     fetch('/api/todos')
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ todos: data });
//         // console.log(this.state);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//   }

//   addTodo(newTodo) {
//     /**
//     * Use fetch to send a POST request to `/api/todos`.
//     * Then 😉, once the response JSON is received and parsed,
//     * add the created todo to the state array.
//     *
//     * Do not mutate the original state array, nor any objects within it.
//     * https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data
//     *
//     * TIP: Be sure to SERIALIZE the todo object in the body with JSON.stringify()
//     * and specify the "Content-Type" header as "application/json"
//     *
//     * TIP: Use Array.prototype.concat to create a new array containing the contents
//     * of the old array, plus the object returned by the server.
//     */

//     fetch('/api/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newTodo)

//     })
//       .then(response => response.json())
//       .then(data => this.setState({ todos: this.state.todos.concat(data) }))
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   toggleCompleted(todoId) {
//     /**
//      * Find the index of the todo with the matching todoId in the state array.
//      * Get its "isCompleted" status.
//      * Make a new object containing the opposite "isCompleted" status.
//      * Use fetch to send a PATCH request to `/api/todos/${todoId}`
//      * Then 😉, once the response JSON is received and parsed,
//      * replace the old todo in the state array.
//      *
//      * NOTE: "toggle" means to flip back and forth, so clicking a todo
//      * in the list should "toggle" its isCompleted status back and forth.
//      *
//      * Do not mutate the original state array, nor any objects within it.
//      * https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data
//      *
//      * TIP: Be sure to SERIALIZE the updates in the body with JSON.stringify()
//      * And specify the "Content-Type" header as "application/json"
//      */
//     const newCompleteStatus = {};
//     const current = this.state.todos.find(todo => todo.todoId === todoId);
//     newCompleteStatus.isCompleted = !current.isCompleted;

//     fetch(`/api/todos/${todoId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newCompleteStatus)
//     })
//       .then(response => response.json())
//       .then(data => {
//         for (let i = 0; i < this.state.todos.length; i++) {
//           if (data.todoId === this.state.todos[i].todoId) {
//             const newState = this.state.todos.slice(0, i).concat(data, this.state.todos.slice(i + 1));
//             this.setState({ todos: newState });
//             break;
//           }
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//   }

//   toDelete(todoId) {
//     // console.log(todoId);
//     fetch(`/api/todos/${todoId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: null
//     });

//     for (let i = 0; i < this.state.todos.length; i++) {
//       if (todoId === this.state.todos[i].todoId) {
//         const newState = this.state.todos.slice(0, i).concat(this.state.todos.slice(i + 1));
//         this.setState({ todos: newState });
//         break;
//       }

//     }
//   }

//   toEdit(todoId) {

//     const current = this.state.todos.find(todo => todo.todoId === todoId);

//     this.setState({ editTodo: current });
//   }

//   editChange(event) {
//     const updatedEditTodo = {};
//     updatedEditTodo.todoId = this.state.editTodo.todoId;
//     updatedEditTodo.task = event.target.value;
//     updatedEditTodo.isCompleted = false;

//     this.setState({ editTodo: updatedEditTodo });

//   }

//   editSubmit(event) {
//     event.preventDefault();
//     const todoId = this.state.editTodo.todoId;

//     const updatedTodo = {};
//     updatedTodo.task = this.state.editTodo.task;
//     updatedTodo.isCompleted = false;

//     fetch(`/api/todos/${todoId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedTodo)
//     })
//       .then(response => response.json())
//       .then(data => {
//         for (let i = 0; i < this.state.todos.length; i++) {
//           if (data.todoId === this.state.todos[i].todoId) {
//             const newState = this.state.todos.slice(0, i).concat(data, this.state.todos.slice(i + 1));
//             this.setState({ todos: newState, editTodo: null });
//             break;
//           }
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//   }

//   toCancel() {
//     this.setState({ editTodo: null });
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className={!this.state.editTodo ? 'modal-holder hidden' : ' modal-holder'}>
//           <div className="box">
//             <form onSubmit={this.editSubmit}>
//               <label className="edit-label">
//                 New Content: <input className="edit-input" type="text" value={!this.state.editTodo ? '' : this.state.editTodo.task} onChange={this.editChange} />
//               </label>
//             </form>
//             <button className="cancel" onClick={this.toCancel} >Cancel</button>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col pt-5">
//             <PageTitle text="Todo App" />
//             <TodoForm onSubmit={this.addTodo} />
//             <TodoList todos={this.state.todos} toDelete={this.toDelete} toEdit={this.toEdit} toggleCompleted={this.toggleCompleted} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
