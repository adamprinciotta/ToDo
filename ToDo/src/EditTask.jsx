import { useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import './AddTask.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import TimePicker from 'react-time-picker'


function EditTask(props) {

    firebase.initializeApp({
        apiKey: "AIzaSyCHxPV3qdlMiczHRksKE8oi7ZvYu7ZsOPU",
        authDomain: "todo-c99c9.firebaseapp.com",
        projectId: "todo-c99c9",
        storageBucket: "todo-c99c9.appspot.com",
        messagingSenderId: "777472247932",
        appId: "1:777472247932:web:2ea24b017159da881421f9",
        measurementId: "G-CKYMJWZWPP"
      })
      const auth = firebase.auth();
      const firestore = firebase.firestore();

    const [time, setTime] = useState('10:00');

    const [task, setTask] = useState('')
    const [sun, setSun] = useState(false)
    const [mon, setMon] = useState(false)
    const [tues, setTues] = useState(false)
    const [wed, setWed] = useState(false)
    const [thur, setThur] = useState(false)
    const [fri, setFri] = useState(false)
    const [sat, setSat] = useState(false)

    let daysTracker = '0000000'

    const [newSectionTest, setNewSectionTest] = useState([])

    const [sections, setSections] = useState([])
    const [sectionsTracker, setSectionsTracker] = useState([])


useEffect(() =>{
    console.log("MADE IT")
    setSections([])
    props.sectionsList.forEach(section => {
        console.log("SECTIONS IN ADDTASK: " + section)
        //Makes sure Add New is not added until the end and makes sure the double render doesn't duplicate it
        if(section != "Add New" && !sectionsTracker.includes(section)){
            //Adds to the tracker
            sectionsTracker.push(section)
            //Pushes to the section dropdown for render
            sections.push(<Dropdown.Item onClick={()=>handleSectionClick(section)}>{section}</Dropdown.Item>)
        }
    })
    //Adds Add New to the end of the list if it's not already there
    if(!sectionsTracker.includes("Add New")){
        sectionsTracker.push("Add New")
        sections.push(<Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>)
    }

    sections.forEach(ListItem =>{
        console.log(ListItem)
    })

    setTask(props.taskToEdit.name)
    console.log("props.taskToEdit.time: " + props.taskToEdit.days)
    console.log("checking substr 0 -> 1 : " + props.taskToEdit.days.substring(0, 1))
    if(props.taskToEdit.days.charAt(0) == '1'){
        setSun(true)
    }
    if(props.taskToEdit.days.charAt(1) == '1'){
        setMon(true)
    }
    if(props.taskToEdit.days.charAt(2) == '1'){
        setTues(true)
    }
    if(props.taskToEdit.days.charAt(3) == '1'){
        setWed(true)
    }
    if(props.taskToEdit.days.charAt(4) == '1'){
        setThur(true)
    }
    if(props.taskToEdit.days.charAt(5) == '1'){
        setFri(true)
    }
    if(props.taskToEdit.days.charAt(6) == '1'){
        setSat(true)
    }

    setTime(props.taskToEdit.time)

    setCurrentSection(props.taskToEdit.section)


    //Updates the render list to be the sections made above
    setNewSectionTest(sections)
}, [])

    const [currentSection, setCurrentSection] = useState('Work')
    
    const [newSection, setNewSection] = useState(false)
    const [newSectionText, setNewSectionText] = useState('')

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(task != ''){

            if(sun){
                let newStr = daysTracker.split("")
                newStr.splice(0, 1, '1')
                daysTracker = newStr.join("")
            }
            if(mon){
                let newStr = daysTracker.split("")
                newStr.splice(1, 1, '1')
                daysTracker = newStr.join("")
            }
            if(tues){
                let newStr = daysTracker.split("")
                newStr.splice(2, 1, '1')
                daysTracker = newStr.join("")
            }
            if(wed){
                let newStr = daysTracker.split("")
                newStr.splice(3, 1, '1')
                daysTracker = newStr.join("")
            }
            if(thur){
                let newStr = daysTracker.split("")
                newStr.splice(4, 1, '1')
                daysTracker = newStr.join("")
            }
            if(fri){
                let newStr = daysTracker.split("")
                newStr.splice(5, 1, '1')
                daysTracker = newStr.join("")
            }
            if(sat){
                let newStr = daysTracker.split("")
                newStr.splice(6, 1, '1')
                daysTracker = newStr.join("")
            }


            const { uid } = auth.currentUser


            const testRef2 = firestore.collection("ListItem").doc(uid)

            var upperTask = task.substring(1, task.length)
            var upperTaskletter = task.charAt(0)
            upperTaskletter = upperTaskletter.toUpperCase()
            var upperTaskCombined = upperTaskletter+upperTask

            testRef2.get().then(function(){

                if(firestore.collection("ListItem").doc(uid).collection("Tasks").doc(task).get().exists){ //If are keeping the same task name
                    console.log("ABOUT TO OVERWRITE A TASK: " + task + "\nwith the props: " + props.taskToEdit.name)
                    firestore.collection("ListItem").doc(uid).collection("Tasks").doc(task).set( //update the task with the new values
                        {
                            days: daysTracker,
                            name: task,
                            section: currentSection,
                            time: time,
                            checked: false
                        }
                    ).then(function(){
                        console.log("Document written with ID: ", uid)
                    })
                    .catch(function(error){
                        console.log("Error: ", error)
                    })
                }
                else{ //If they change the name of the task, need to delete the old one and make a new one
                    console.log("ABOUT TO OVERWRITE A TASK: " + task + "\nwith the props: " + props.taskToEdit.name)
                    

                    //delete the old task then in the .then, set the new task
                    firestore.collection("ListItem").doc(uid).collection("Tasks").doc(props.taskToEdit.name).delete()
                    .then(function() {
                        console.log("Deleted");
                        firestore.collection("ListItem").doc(uid).collection("Tasks").doc(task)
                        .set({ //sets the new task
                            days: daysTracker,
                            name: task,
                            section: currentSection,
                            time: time
                        })
                        .then(function() { //rerenders the page to update
                            console.log("Document written with ID: ", uid);
                            props.rerenderGrabData()
                        })
                        .catch(function(error) {
                            console.log("Error: ", error);
                        });
                    })
                    .catch(function(error) {
                        console.log("Error: ", error);
                    });
                }
            }).catch(function(error){
                console.log("error: " + error)
            })

            //Sets the toggle for visiblity off
            props.setEditTask(false)
            console.log("ABOUT TO RERENDER")
            //rerenders the page to update
            props.rerenderGrabData()
        }
        else{ //if they try to submit an empty task don't let them
            alert("You cannot add an empty task")
        }
    }

    //makes the modal invisible when the X is clicked
    function handleCancel() {
        setTask('')
        props.setEditTask(false)
    }

    function handleSectionClick(item) {
        console.log("section click title clicked: " + item)
        //if they select the Add New section from the dropdown then bring up the option to type a new one
        if (item === "Add New") {
            console.log(item + " === Add New")
            setNewSection(true)
          }
          //updates the header for the dropdown and keeps track of which section should be saved for the task
          else{
            setCurrentSection(item)
          }
      }


    function handleNewSection(){
        console.log("handling new section")
        //gets the new list without the Add New object
        const newSectionList = [...newSectionTest.slice(0, sections.length-1)]
        //adds the new object that they want to add
        newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick(newSectionText)}>{newSectionText}</Dropdown.Item>)
        //then adds in the Add new object again
        newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>)


        //Updates the stored sections
        props.sectionsList.push(newSectionText)

        //sets it so the new section should not show up
        setNewSection(false)
        //resets the new section text so when they add a new section it doesn't have the last section they wanted
        setNewSectionText("")

        //updates the list being displayed
        setNewSectionTest(newSectionList)
        //updates the dropdown menu to hold the new value as QOL fix
        handleSectionClick(newSectionText)
      }

    const handleNewSectionTextChange = event =>{
        setNewSectionText(event.target.value)
    }

    return(
    <>
    <div className="taskModal" style={{paddingTop: "15px"}}> 
        <Button onClick={handleCancel} className="cancel">X</Button>

        <form onSubmit={handleSubmit}>
            <label style={{color: 'white', fontSize: '20px', width: '40vw'}}>
                Task:
                <input type="text" className="taskInput" value={task} onChange={taskChange}  />
            </label>
            <input className='submit' type="submit" value="Submit"/>
        </form>

        <div className="repeat">What days do you want this task to repeat?</div>
        <div className="days">
            <Button className='sun' id="sun" onClick={handleDayClicked} style={{ backgroundColor: sun ? "lightgreen" : "red" }}>S</Button>
            <Button className='mon' id="mon" onClick={handleDayClicked} style={{ backgroundColor: mon ? "lightgreen" : "red" }}>M</Button>
            <Button className='tues' id="tues" onClick={handleDayClicked} style={{ backgroundColor: tues ? "lightgreen" : "red" }}>T</Button>
            <Button className='wed' id="wed" onClick={handleDayClicked} style={{ backgroundColor: wed ? "lightgreen" : "red" }}>W</Button>
            <Button className='thur' id="thur" onClick={handleDayClicked} style={{ backgroundColor: thur ? "lightgreen" : "red" }}>TR</Button>
            <Button className='fri' id="fri" onClick={handleDayClicked} style={{ backgroundColor: fri ? "lightgreen" : "red" }}>F</Button>
            <Button className='sat' id="sat" onClick={handleDayClicked} style={{ backgroundColor: sat ? "lightgreen" : "red" }}>SA</Button>
        </div>

        <div className="section">
        <TimePicker value = {time} onChange = {setTime}/>
            <Dropdown id = "dropdownBtn" className="dropdownBtn" title={"Example"}>
                <Dropdown.Toggle id="dropdown-autoclose-true " className="dropdownBtn">
                {currentSection}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {newSectionTest.map((index) => {
                        return(index)
                    })}
                </Dropdown.Menu>
            </Dropdown>
            {newSection && <form onSubmit={handleNewSection}>
            <label>
                New Section:
                <input type="text" className="taskInput" value={newSectionText} onChange={handleNewSectionTextChange}  />
            </label>
            <input type="submit" value="Submit"/>
        </form>}
        </div>
    </div>
    </>
    )
}

export default EditTask