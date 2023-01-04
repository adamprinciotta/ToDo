import { useState } from 'react'
import './AddTask.css'
import Button from 'react-bootstrap/Button'


function AddTask(props) {

    const [task, setTask] = useState('')
    const [sun, setSun] = useState(false)
    const [mon, setMon] = useState(false)
    const [tues, setTues] = useState(false)
    const [wed, setWed] = useState(false)
    const [thur, setThur] = useState(false)
    const [fri, setFri] = useState(false)
    const [sat, setSat] = useState(false)


    function addTheTask(){
        console.log(added)
    }

    function handleDayClicked(event){
        if(event.target.id === 'sun'){
            setSun(!sun)
        }
        if(event.target.id === 'mon'){
            setMon(!mon)
        }
        if(event.target.id === 'tues'){
            setTues(!tues)
        }
        if(event.target.id === 'wed'){
            setWed(!wed)
        }
        if(event.target.id === 'thur'){
            setThur(!thur)
        }
        if(event.target.id === 'fri'){
            setFri(!fri)
        }
        if(event.target.id === 'sat'){
            setSat(!sat)
        }
    }

    const taskChange = event =>{
        setTask(event.target.value)
      }

    function handleSubmit(event) {
        event.preventDefault()
        if(task != ''){
            console.log(props.add)
            const newItem = { name: task, checked: false}
            props.setList(props.list.concat(newItem))
            console.log("Submitted")
            props.checkListSize()
        }
        else{
            alert("You cannot add an empty task")
        }
    }

    return(
    <>
    <div className="taskModal" style={{paddingTop: "15px"}}> 
        <form onSubmit={handleSubmit}>
            <label>
                Task:
                <input type="text" value={task} onChange={taskChange}  />
            </label>
            <input type="submit" value="Submit"/>
        </form>

        <div className="repeat">What days do you want this task to repeat?</div>
        <div className="days">
            {/* <ButtonGroup>
                <Button> Group 1 </Button>
                <Button> Group 2 </Button>
            </ButtonGroup> */}
            <Button className='sun' id="sun" onClick={handleDayClicked} style={{ backgroundColor: sun ? "lightgreen" : "red" }}>S</Button>
            <Button className='mon' id="mon" onClick={handleDayClicked} style={{ backgroundColor: mon ? "lightgreen" : "red" }}>M</Button>
            <Button className='tues' id="tues" onClick={handleDayClicked} style={{ backgroundColor: tues ? "lightgreen" : "red" }}>T</Button>
            <Button className='wed' id="wed" onClick={handleDayClicked} style={{ backgroundColor: wed ? "lightgreen" : "red" }}>W</Button>
            <Button className='thur' id="thur" onClick={handleDayClicked} style={{ backgroundColor: thur ? "lightgreen" : "red" }}>TR</Button>
            <Button className='fri' id="fri" onClick={handleDayClicked} style={{ backgroundColor: fri ? "lightgreen" : "red" }}>F</Button>
            <Button className='sat' id="sat" onClick={handleDayClicked} style={{ backgroundColor: sat ? "lightgreen" : "red" }}>SA</Button>
        </div>
    </div>
    </>
    )
}

export default AddTask