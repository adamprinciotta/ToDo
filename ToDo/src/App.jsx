import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import AddTask from './AddTask.jsx'

function App() {
  const [list, setList] = useState(['test'])
  const [add, setAdd] = useState(false)


  function displayTasks(){
    console.log(list)
    list.map(item => {
      console.log(item)
    })
    return(list.map(item => {
      <div className="listItems">{item}</div>
    }))
  }

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
      
      {/* {list.size > 0 && list.map(listItem => {
        <div className="listItems" key={listItem}>{listItem}</div>
      })} */}

      { list.length > 0 && displayTasks() }
      
      <Button onClick={addTask}>Add Task</Button>



      {add && (<AddTask list={list} setList={setList} add={add} setAdd={setAdd} displayTasks={displayTasks} checkListSize={checkListSize}/>)}
      

    </div>
  )
}

export default App
