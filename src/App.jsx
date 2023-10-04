import React, { useEffect, useState } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import {BiEditAlt} from 'react-icons/bi'
import './App.css'
import ParticleBack from './components/ParticleBack'

function App() {
  const [isCompScreen, setIsCompScreen] = useState(false);
  const [allTodos, setTodos]=useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  const handleAddTodo = () => {
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoArr))
    }
    const handleEdit = (index) => {
      setIsEditing(true);
      setEditIndex(index);
    };
    
    const handleEditTitle = (index, newTitle) => {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr[index].title = newTitle;
      setTodos(updatedTodoArr);
    };
    
    const handleEditDescription = (index, newDescription) => {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr[index].description = newDescription;
      setTodos(updatedTodoArr);
    };
    
    const handleSaveEdit = (index) => {
      setIsEditing(false);
      setEditIndex(null);
      localStorage.setItem('todoList', JSON.stringify(allTodos));
    };
    

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); 
    localStorage.setItem('todoList', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let hh = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + min + ':' + sec;
  
    let updatedCompletedArr = [...completedTodos];
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };
  
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1); 
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }
  
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todoList'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setTodos(savedTodo)
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])
  return (
    <>
    <div className="App">
      <h1>My Todos</h1>
      <div className="todoWrapper">
        <div className="todoInput">
          <div className='todoInputItem'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className='todoInputItem'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?"/>
          </div>
          <div className='todoInputItem'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className="btnArea">
          <button className={`secondaryBtn ${isCompScreen===false && 'active'}`} onClick={()=>setIsCompScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompScreen===true && 'active'}`} onClick={()=>setIsCompScreen(true)}>Completed</button>
        </div>
        <div className="todoList">
        {isCompScreen === false &&
  allTodos.map((item, index) => {
    return (
      <div className={`todoListItem ${isEditing && index === editIndex ? 'editClick' : ''}`} key={index}>
      <div>
        {isEditing && index === editIndex ? (
          <div>
            <label className="editLabel">Edit Title</label>
            <input
              className='editInput'
              type="text"
              value={item.title}
              onChange={(e) => handleEditTitle(index, e.target.value)}
            />
            <label className="editLabel">Edit Description</label>
            <input
              className='editInput'
              type="text"
              value={item.description}
              onChange={(e) => handleEditDescription(index, e.target.value)}
            />
          </div>
        ) : (
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        )}
      </div>
      <div>
        {isEditing && editIndex === index ? (
          <button className='saveButton' onClick={() => handleSaveEdit(index)}>Save</button>
        ) : (
          <>
            <AiOutlineDelete
              className="icon"
              onClick={() => handleDeleteTodo(index)}
            />
            <BsCheckLg
              className="checkIcon"
              onClick={() => handleCompleted(index)}
            />
            <BiEditAlt
              className="editIcon"
              onClick={() => handleEdit(index)}
            />
          </>
        )}
      </div>
    </div>
    
    )
  })}
  
          {isCompScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className="todoListItem" key={index}>
            <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>
          </div>
          <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}/>
          </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>
    <ParticleBack/>
    </>
  )
}

export default App
