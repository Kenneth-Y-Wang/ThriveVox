import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import CustomAccordion from '../components/accordion';
import EditForm from '../components/edit-form';

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
      profileUrl: '',
      isEditing: false

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInputRef = React.createRef();
    this.clickToEdit = this.clickToEdit.bind(this);
  }

  componentDidMount() {
    if (this.context.user) {

      const userId = this.context.user.userId;
      fetch(`/api/profile/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const { avaterUrl, avaterCaption, userStyle, userSkills, userInstruments, userPrimaryInterest, userInterest, userBand, userBio } = data;
          this.setState({
            caption: avaterCaption,
            style: userStyle,
            skill: userSkills,
            instrument: userInstruments,
            mainInterest: userPrimaryInterest,
            interest: userInterest,
            band: userBand,
            about: userBio,
            profileUrl: avaterUrl
          });

        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  clickToEdit() {
    this.setState({ isEditing: !this.state.isEditing });
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
    this.clickToEdit();
  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;
    const displayName = this.context.user.username;
    const displayLocation = this.context.user.userLocation;
    const displayEmail = this.context.user.email;
    const { caption, style, skill, instrument, mainInterest, interest, band, about, profileUrl } = this.state;
    const { handleChange, handleSubmit, clickToEdit } = this;

    return (
      <div className="home-page">
        <div className={this.state.isEditing ? 'edit-page-holder' : 'edit-page-holder hidden'}>
          < EditForm handleSubmit={handleSubmit} handleChange={handleChange} fileInputRef={this.fileInputRef} clickToEdit={clickToEdit}
            avaterCaption={caption} userStyle={style} userSkills={skill} userInstruments={instrument}
            userPrimaryInterest={mainInterest} userInterest={interest} userBand={band} userBio={about} />
        </div>
        <div className="personal-info">
          <div className="col-two-fifth pic-column">
            <div className="pic-holder">
              <img src={profileUrl} />
            </div>
            <h4 className="profile-caption">{caption}</h4>
          </div>
          <div className="col-two-fifth info-column">
            <div className="profile-edit-row">
              <h4>Welcome, <span className="display-name">{displayName}</span></h4>
              <button className="profile-edit-button"><i onClick={this.clickToEdit} className="fas fa-edit"></i></button>
            </div>
            <h4 className="display-info">Location:</h4>
            <h4>{displayLocation}</h4>
            <h4 className="display-info">Email:</h4>
            <h4>{displayEmail}</h4>
            <h4 className="display-info">Primary Interest:</h4>
            <h4>{mainInterest}</h4>
          </div>
        </div>
        <CustomAccordion userStyle={style} userSkills={skill} userInstruments={instrument} userInterest={interest} userBand={band} userBio={about}/>
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
