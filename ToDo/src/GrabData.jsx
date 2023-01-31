import { useState } from 'react'
import './App.css'
import DisplayTask from './DisplayTask'
import Button from 'react-bootstrap/Button'
import AddTask from './AddTask.jsx'
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
  const [sectionsList, setSectionsList] = useState(["Work", "Personal"])

  const [add, setAdd] = useState(false)

    const { uid } = auth.currentUser

    useEffect(() => {
      firestore.collection("ListItem").doc(uid).collection("Tasks").get()
      .then(snapshot => {
        const taskData = []
        snapshot.forEach(doc => {
          if(!sectionsList.includes(doc.data().section)){
            sectionsList.push(doc.data().section)
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
        if(sectionsList.includes("Add New")){
          sectionsList.remove("Add New")
          sectionsList.push("Add New")
        }
        else{
          sectionsList.push("Add New")
        }
        console.log("sections" + sectionsList)
        setTasks(taskData)
      })
      .catch(error => {
        console.error("Error getting sub collection: ", error);
      });

    },[rerender])

    return(
      <>
        {tasks.map(task =>(
          <DisplayTask key={task.id} name={task.name} days={task.days} section={task.section} time={task.time} checked={task.checked} setRerender={setRerender} rerender={rerender}/>
        ))}
        {/* {add && <AddTask2 sectionsList={sectionsList} setSectionsList={setSectionsList} add={add} setAdd={setAdd}/> }*/}
      </>
    )
  }

export default GrabData