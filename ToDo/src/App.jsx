import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import AddTask from './AddTask.jsx'
import Task from './Task.jsx'

function App() {
  const [list, setList] = useState([{name: 'test', checked: false}])
  const [add, setAdd] = useState(false)


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
    <div className="fullPage">
      
      <div className="header">
      To Do List
      </div>
      <Task list={list} setList={setList}/>
      
      <Button onClick={addTask} style={{borderColor: "black"}}>Add Task</Button>


      {/* displayTasks={displayTasks} */}
      {add && (<AddTask list={list} setList={setList} add={add} setAdd={setAdd}  checkListSize={checkListSize}/>)}
      

    </div>
  )
}

export default App
