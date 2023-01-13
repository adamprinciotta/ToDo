import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import AddTask from './AddTask.jsx'
import Task from './Task.jsx'
import AddTaskModal from './AddTaskModal'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';

// import Modal from 'react-bootstrap/Modal';


function App() {
  const [list, setList] = useState([{name: 'test', checked: false, section: ''}])
  const [add, setAdd] = useState(false)

  const [storedSections, setStoredSections] = useState(['test1', 'test2'])


  // function handleSectionClick(item) {
  //   console.log("sections item props children: " + item)
  //   //if they select the Add New section from the dropdown then bring up the option to type a new one
  //   if (item === "Add New") {
  //       console.log(item + "=== Add New")
  //       setNewSection(true)
  //     }
  //     //updates the header for the dropdown and keeps track of which section should be saved for the task
  //     else{
  //       setCurrentSection(item)
  //     }
  // }

  // const [sections, setSections] = useState([<Dropdown.Item onClick={()=>handleSectionClick("Work")}>Work</Dropdown.Item>, 
  // <Dropdown.Item onClick={()=>handleSectionClick("Personal")}>Personal</Dropdown.Item>, 
  // <Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>])


  // function displayTasks(){
  //   console.log(list)
  //   console.log("This is the list length:" + list.length)
  // }

  function checkListSize() {
    console.log("list: " + list.length)
  }

  function addTask(){
    setAdd(true)
  }

  return (
    <>
    
    <div className="fullPage">
      <div className="header">
      To Do List
      </div>
      <Task list={list} setList={setList}/>
      
      <Button onClick={addTask} className="addTaskBtn" style={{borderColor: "black"}}>Add Task</Button>
      {/* <AddTaskModal show={add} onHide={() => setAdd(false)}/> */}

      {/* displayTasks={displayTasks} */}
      {add && (<AddTask list={list} setList={setList} add={add} setAdd={setAdd} checkListSize={checkListSize} storedSections={storedSections} setStoredSections={setStoredSections}/>)}
      

    </div>
    
    </>
  )
}

export default App
