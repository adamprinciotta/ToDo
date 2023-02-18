import { useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import './AddTask.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import TimePicker from 'rc-time-picker';
import ReactDOM from 'react-dom';
// import 'rc-time-picker/assets/index.css';

import TimePicker from 'react-time-picker'

function AddTask2(props) {

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

    // const newSectionList = [...newSectionTest.slice(0, newSectionTest.length-1)]
    // //adds the new object that they want to add
    // newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick(newSectionText)}>{newSectionText}</Dropdown.Item>)
    // //then adds in the Add new object again
    // newSectionList.push(<Dropdown.Item onClick={()=>handleSectionClick("Add New")}>Add New</Dropdown.Item>)

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
    
    //Gets and sets the current time to be the time they may want to set the task
    let date = new Date()
    setTime(date.getHours() + ':' + date.getMinutes())

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
        var firstLetterUpper = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        setTask(firstLetterUpper)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(task != ''){
            // console.log(props.add)
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
            // console.log(daysTracker)

            const { uid } = auth.currentUser
            // console.log("UID : " + uid)

            const testRef = firestore.collection("ListItem")
            const testRef2 = firestore.collection("ListItem").doc(uid)
            // console.log("testRef: " + testRef)
            // console.log("testRef2: " + testRef2)

            var upperTask = task.substring(1, task.length)
            var upperTaskletter = task.charAt(0)
            upperTaskletter = upperTaskletter.toUpperCase()
            var upperTaskCombined = upperTaskletter+upperTask

            testRef2.get().then(function(doc){
                if(doc.exists){ //If they already have a task made
                    firestore.collection("ListItem").doc(uid).collection("Tasks").doc(task).set(
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
                else{ //If this is the first task they are adding, then create a new doc and collection
                    firestore.collection("ListItem").doc(uid).collection("Tasks").doc(task).set( 
                        {
                            days: daysTracker,
                            name: task,
                            section: currentSection,
                            time: time
                        }).then(function(){
                                console.log("Document written with ID: ", uid)
                        })
                            .catch(function(error){
                                console.log("Error: ", error)
                        })
                    console.log("Doc doesn't exist")
                }
            }).catch(function(error){
                console.log("error: " + error)
            })

            //Sets the toggle for visiblity off
            props.setAdd(false)
            console.log("ABOUT TO RERENDER")
            props.rerenderGrabData()
        }
        else{
            alert("You cannot add an empty task")
        }
    }

    function handleCancel() {
        setTask('')
        props.setAdd(false)
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

        //updates the dropdown list
        //setSections(newSectionList)

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
        var firstLetterUpper = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
        setNewSectionText(firstLetterUpper)
    }

    function handleSectionCancel(){
        setNewSection(false)
        setNewSectionText('')
    }

    return(
    <>
    <div className="taskModal" style={{paddingTop: "15px"}}> 
    <Button onClick={handleCancel} className="cancel">X</Button>
        <div className="addTaskContainer">
            <div className='title'>Add a New Task</div>
            <form className='taskForm' onSubmit={handleSubmit}>
                <label style={{color: 'black', fontSize: '20px', width: '40vw'}}>
                    Task:
                    <input type="text" className="taskInput" value={task} onChange={taskChange}  />
                </label>
                <input className='submit' type="submit" value="Submit"/>
            </form>

            <div className='repeatDays'>
                <div className="repeat">What days do you want this task to repeat?</div>
                <div className="days">
                    <Button className='sun' id="sun" onClick={handleDayClicked} style={{ color: sun ? "black" : "white", backgroundColor: sun ? "lightgreen" : "#FF5964" }}>S</Button>
                    <Button className='mon' id="mon" onClick={handleDayClicked} style={{ color: mon ? "black" : "white", backgroundColor: mon ? "lightgreen" : "#FF5964" }}>M</Button>
                    <Button className='tues' id="tues" onClick={handleDayClicked} style={{ color: tues ? "black" : "white", backgroundColor: tues ? "lightgreen" : "#FF5964" }}>T</Button>
                    <Button className='wed' id="wed" onClick={handleDayClicked} style={{ color: wed ? "black" : "white", backgroundColor: wed ? "lightgreen" : "#FF5964" }}>W</Button>
                    <Button className='thur' id="thur" onClick={handleDayClicked} style={{ color: thur ? "black" : "white", backgroundColor: thur ? "lightgreen" : "#FF5964" }}>TR</Button>
                    <Button className='fri' id="fri" onClick={handleDayClicked} style={{ color: fri ? "black" : "white", backgroundColor: fri ? "lightgreen" : "#FF5964" }}>F</Button>
                    <Button className='sat' id="sat" onClick={handleDayClicked} style={{ color: sat ? "black" : "white", backgroundColor: sat ? "lightgreen" : "#FF5964" }}>SA</Button>
                </div>
            </div>
                
            <TimePicker  required={true} disableClock={true} value={time} onChange={setTime}  /> {/*THIS IS THE TIME PICKER I HAVE BEEN USING */}
            
            {/* className = 'timePickerClass'  style={{ paddingBottom: '500px', color: 'inherit' }}*/}
            {/* <TimePicker  format='hh:mm a' showSecond={false} use12Hours={true} placeholder='10:00am' onChange={updateTime()}></TimePicker> */}
            <div className="section">
            {/* <TimePicker value = {time} onChange = {setTime} style={{paddingBottom: '10px'}}/> */}
            
            
                <Dropdown id = "dropdownBtn" className="dropdownBtn"  title={"Example"}>
                    <Dropdown.Toggle id="dropdown-autoclose-true " style={{ border: 'black', backgroundColor: '#5158BB', color: 'white' }} className="dropdownBtn">
                    {currentSection}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {newSectionTest.map((index) => {
                            return(index)
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {newSection && <form className='formInput' onSubmit={handleNewSection}>
                <label>
                    New Section:
                    <input type="text" className="taskInputTwo" value={newSectionText} onChange={handleNewSectionTextChange}  />
                </label>
                <input className='newSubmit' type="submit" value="Submit"/>
                <Button onClick={handleSectionCancel} className="cancel" style={{marginTop: '-10px', marginRight: '-10px'}}>X</Button>
            </form>}
        </div>
    </div>

    </>
    )
}

export default AddTask2