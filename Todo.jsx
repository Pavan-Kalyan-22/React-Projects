import React, { useEffect, useState } from 'react';
import './App.css';
import './Todo.css'
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");    //for title
  const [newDescription, setNewDescription] = useState(""); //for description
  const [completeTodos, setCompleteTodos] = useState([]);  //For Complete Tab


  const handleAddTodo = () => {
    // For Add button
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };

  const DeleteTodo = (index) => {      // For Delete Button
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index);

    localStorage.setItem('todolist', JSON.stringify(reduceTodo));
    setTodos(reduceTodo)

  }

  const completeDleteTodo = (index) => {       //completed delete dashboard
    let FinishedTodo = [...completeTodos];
    FinishedTodo.splice(index);

    localStorage.setItem('FinishedTodo', JSON.stringify(FinishedTodo));
    setCompleteTodos(FinishedTodo);
  };
  const handleComplete = (index) => {
    let work = new Date();
    let dd = work.getDate();
    let mm = work.getMonth() + 1;
    let yyyy = work.getFullYear();
    let h = work.getHours();
    let m = work.getMinutes();
    let s = work.getSeconds();

    let completedOn = dd + '-' + mm + '-' + yyyy + 'At' + h + ':' + m + ':' + s;
    let filterdItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completeTodos];
    updatedCompletedArr.push(filterdItem);
    setCompleteTodos(updatedCompletedArr);
    DeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));


  }

  useEffect(() => {
    let SavedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completeTodos '));
    if (SavedTodo) {
      setTodos(SavedTodo);
    }
    if (savedCompletedTodo) {
      setCompleteTodos(savedCompletedTodo);
    }


  }, [])


  return (

    <div className="App">
      <h2>MY GOALS</h2>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="Inputs">
            <label>GOAL</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter Your Goal" />
          </div>
          <div className="Inputs">
            <label>Acheive</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What You Want Achieve" />
          </div>
          <div className="Inputs">
            <button type="button" onClick={handleAddTodo} id="btn">ADD</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`btn-area ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}>Todo</button>

          <button className={`btn-area ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className="Todo-list">
          {isCompleteScreen === false && allTodos.map((item, index) => (
            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <MdDeleteForever className='icon' onClick={() => DeleteTodo(index)} />
                <FaCheckCircle onClick={() => handleComplete(index)} className='check-icon' />
              </div>
            </div>
          ))}
          {isCompleteScreen === true && completeTodos.map((item, index) => (        //Completed  dashboard  starts here 
            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed: {item.completedOn}</small></p>
              </div>
              <div>
                <MdDeleteForever className='icon' onClick={() => completeDleteTodo(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Todo;
