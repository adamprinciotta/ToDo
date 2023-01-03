import { useState } from 'react'
import './AddTask.css'
import Button from 'react-bootstrap/Button'


function AddTask(props) {

    const [task, setTask] = useState('')

    function addTheTask(){
        console.log(added)
    }

    const taskChange = event =>{
        setTask(event.target.value)
      }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(props.add)
        // props.setList(prev => [...prev, task.toString()])
        props.setList(props.list.concat(task))
        console.log("Submitted")
        props.setAdd(false)
        //console.log(props.list)
        props.displayTasks()
        props.checkListSize()
    }

    return(
    <>
    <div className="taskModal" > 
        <div className="taskModalText">Hello</div>
        <div className='taskModalText'>Hellooooo {props.add}</div>
        {props.list.map(item => {
            <div className="listItems">{item}</div>
        })}
        <form onSubmit={handleSubmit}>
            <label>
                Task:
                <input type="text" value={task} onChange={taskChange} />
            </label>
            <input type="submit" value="Submit"/>
        </form>
      
        {/* <form className="taskForm" onSubmit={addTheTask()}>
            <label>Task:</label>
            <input type="text" value = {task} onChange = {taskChange()}></input>
            <input type="submit" value = "submit"/>
        </form> */}
    </div>
    </>
    )
}

export default AddTask