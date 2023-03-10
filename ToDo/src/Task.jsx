import { useState } from 'react'
import './Task.css'
import Button from 'react-bootstrap/Button'


function Task(props) {
    function handleChecked(index){
        const newTaskList = [...props.list]
        newTaskList[index].checked = !newTaskList[index].checked
        props.setList(newTaskList)
    }

    return(
        <div>
            {/* Mapping through each item in the task list */}
            {props.list.map((item, index) => {
            // Must return the jsx that I want to render
          return (
            //The whole task
            <>
            <div className="taskContainer">
                <div key={index} className="task">
                  {/* Checkbox input */}
                  <input 
                  className="checkboxStyle"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleChecked(index)}
                  /> 
                  <div className="taskName" style={{
                      textDecoration: item.checked ? "line-through" : "none", paddingLeft: "20px" }}>{item.name}
                  </div>
              </div>
              <div className="sectionName" style={{position: 'relative', right: '-50px'}}>
                    {item.section}
              </div>
            </div>
            <div className='spacer' style={{paddingTop: "15px"}}></div>
            </>
          );
        })}
      </div>
    )
}

export default Task