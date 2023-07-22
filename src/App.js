import { useReducer, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';

const ACTIONS = {
    ADD_TODO: 'add_todo',
    TOGGLE_TODO: 'toggle_todo',
    DELETE_TODO: 'delete_todo'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO :
      return [...state, newToDo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO :
      return state.map((item) => {
        return item.id === action.payload.id ? {...item, completed: !item.completed} : item
      });
    case ACTIONS.DELETE_TODO :
      return state.filter((item) => {
        return item.id !== action.payload.id 
      });    
    default:
      return state;
  }
}

function newToDo(name) {
  return { id: Date.now(), text: name, completed: false};
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, []);
  //const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setinputError] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [addedInfo, setaddedInfo] = useState('');

  /** 
    * Add to-do input
    * 
    * @private
    * @type Event
    * @param {object} e - event object
    * @returns {void}
    */
  const handleInputValue = (e) => {
    setinputError(false);
    setInputValue(e.target.value);
    setaddedInfo('');
  };

  /** 
    * To-do Form 
    * When the user submit the form 
    * 
    * @private
    * @type Event
    * @param {object} e - event object
    * @returns {void}
    */
  const handleFromSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return setinputError(true);
    } 
    //setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false}]);
    dispatch({type: ACTIONS.ADD_TODO, payload: {name: inputValue}})
    setInputValue('');
    setaddedInfo('A new list added');
  };

  /** 
    * Add to-do Form 
    * When the user submit the form 
    * 
    * @private
    * @type {Event}
    * @param {string} id - task id
    * @returns {void}
    */
  const handleToggleTask = (id) => {
    // const modifiedTasks = tasks.map((item) => {
    //   return item.id === id ? {...item, completed: !item.completed} : item
    // });
    dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: id}});
    //setTasks(modifiedTasks);
  };

  /** 
    * Add to-do Form 
    * When the user submit the form 
    * 
    * @private
    * @type {Event}
    * @param {string} id - task id
    * @returns {void}
    */
  const handleDeleteTask = (id, itemName) => {
    //setTasks(tasks.filter(item => item.id !== id));
    dispatch({type: ACTIONS.DELETE_TODO, payload: {id: id}});
    setaddedInfo(`Item ${itemName} deleted`);
  };

  return (
    
    <div className="grid-container">
      {/* MAIN HEADER */}
      <Header>React To-do List</Header>

      {/* MAIN Content */}
      <main className="main-content">
        <Form 
          handleFromSubmit={handleFromSubmit}
          inputValue={inputValue}
          handleInputValue={handleInputValue}
          inputError={inputError}
        />

        <Todo 
          tasks={tasks} 
          showCompleted={showCompleted}
          handleShowCompleted={() => setShowCompleted(!showCompleted)}
          handleToggleTask={handleToggleTask}
          handleDeleteTask={handleDeleteTask}
        />
      </main>
      {addedInfo && <div className='sr-only' role='alert' aria-live='assertive'>{addedInfo}</div>}
      {/* MAIN FOOTER */}
      <Footer />

    </div>
  );
}

export default App;
