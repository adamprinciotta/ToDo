import { useState } from 'react'
import './App.css'
import DisplayTask from './DisplayTask'
import Button from 'react-bootstrap/Button'
import AddTask2 from './AddTask2.jsx'
import EditTask from './EditTask'
import Task from './Task.jsx'
//import SignIn from './SignIn'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
//import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, doc, collection, query, where, orderBy } from 'firebase/firestore';
import { useEffect } from 'react'


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
  

function GrabData(){

  const [tasks, setTasks] = useState([])
  const [rerender, setRerender] = useState(false)
  const [rerenderDisplay, setRerenderDisplay] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  const [sectionsList, setSectionsList] = useState(["Work", "Personal"])

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = new Date()
  const dayOfTheWeek = days[today.getDay()]
  const dayIndex = days.indexOf(dayOfTheWeek)

  const [taskToEdit, setTaskToEdit] = useState({})
  const [editTask, setEditTask] = useState(false)

  const [add, setAdd] = useState(false)

  function rerenderGrabData(){
    setRerender(!rerender)
    setDataLoaded(false)
  }

  function addTask(){
    setAdd(true)
  }

  function handleDelete(taskName){
    console.log("Task Name to delete: " + taskName)
    firestore.collection("ListItem").doc(uid).collection("Tasks").doc(taskName).delete()
    .then(function() {
        console.log("Deleted");
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });
    rerenderGrabData()
  }

    const { uid } = auth.currentUser

    useEffect(() => {
      console.log("This is the value of rerender: " + rerender)
      console.log("This is the value of dataLoaded: " + dataLoaded)
      console.log("This is sectionList before even doing anything: " + sectionsList)
      firestore.collection("ListItem").doc(uid).collection("Tasks").get({ source: 'server' })
      .then(snapshot => {
        const taskData = []
        snapshot.forEach(doc => {
          if(!sectionsList.includes(doc.data().section) && doc.data().section != "Add New"){
            console.log("This is a section to be added: " + doc.data().section)
            setSectionsList(prevSectionsList => [...prevSectionsList, doc.data().section])
          }
          else{
            console.log("This is a section that won't be added: " + doc.data().section)
          }
          taskData.push({
            id: doc.id,
            name: doc.data().name,
            days: doc.data().days,
            section: doc.data().section,
            time: doc.data().time,
            checked: doc.data().checked
          })
          console.log(doc.id, " => ", doc.data());
        });
        console.log("This is the sections right after the forEach: " + sectionsList)
        if (sectionsList.includes("Add New")) {
          console.log("replaced it and added to the end")
        } else {
          setSectionsList(prevSectionsList => [...prevSectionsList, "Add New"]);
          console.log("Added it: " + sectionsList)
        }
        console.log("sections: " + sectionsList)
        setTasks(taskData)
        setDataLoaded(true)
      }
      )
      .catch(error => {
        console.error("Error getting sub collection: ", error);
      });
      
    },[rerender, sectionsList, dataLoaded]) //dataLoaded makes sure it rerenders again after the data is grabbed

    function uncheckAll(){
      tasks.map(task => {
        console.log("About to try to set")
        firestore.collection("ListItem").doc(uid).collection("Tasks").doc(task.name).set( //update the task with the new values
        {
            days: task.days,
            name: task.name,
            section: task.section,
            time: task.time,
            checked: false
        }
    ).then(function(){
        console.log("Unchecked all")
        rerenderGrabData()
    })
      })
    }

    return(
      <>
      <h1 style={{paddingBottom: '10px'}}>To Do List</h1>
      <Button style={{marginBottom: '10px', backgroundColor: '#192A51', borderColor: 'black', }} onClick={uncheckAll}>Uncheck All</Button>
        <Button onClick={addTask} className="addTaskBtn" style={{backgroundColor: '#192A51', borderColor: "black", width: '33vw', marginLeft:'auto', marginRight: 'auto'}}>Add Task</Button>
        {dataLoaded && (<div style={{overflowY:'auto', overflowX: 'hidden', height: '75vh', width: '92%'}}>{tasks.map(task =>(
          <DisplayTask 
            key={task.id} 
            name={task.name} 
            days={task.days} 
            section={task.section} 
            time={task.time} 
            checked={task.checked} 
            rerenderDisplay={rerenderDisplay} 
            setRerender={setRerender} 
            day={dayIndex} 
            rerender={rerender}
            editTask={editTask}
            setEditTask={setEditTask}
            taskToEdit={taskToEdit} 
            setTaskToEdit={setTaskToEdit}
            handleDelete={handleDelete}/>
        ))}</div>)}
        {add && 
        <AddTask2 
          sectionsList={sectionsList} 
          setSectionsList={setSectionsList} 
          add={add} setAdd={setAdd} 
          rerenderGrabData={rerenderGrabData}/>
        }
        {!add && editTask && 
        <EditTask 
        sectionsList={sectionsList} 
        setSectionsList={setSectionsList} 
        editTask={editTask} setEditTask={setEditTask}
        taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} 
        rerenderGrabData={rerenderGrabData}></EditTask>}

      </>
    )
  }

export default GrabData