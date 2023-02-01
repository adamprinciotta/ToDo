import { useState } from 'react'
import './App.css'
import DisplayTask from './DisplayTask'
import Button from 'react-bootstrap/Button'
import AddTask2 from './AddTask2.jsx'
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

  function addTask(){
    setAdd(true)
  }

    const { uid } = auth.currentUser

    useEffect(() => {
      console.log("This is sectionList before even doing anything: " + sectionsList)
      firestore.collection("ListItem").doc(uid).collection("Tasks").get()
      .then(snapshot => {
        // const taskData = []
        // snapshot.forEach(doc => {
        //   if(!sectionsList.includes(doc.data().section)){
        //     console.log("This is a section to be added: " + doc.data().section)
        //     sectionsList.push(doc.data().section)
        //   }
        //   else{
        //     console.log("This is a section that won't be added: " + doc.data().section)
        //   }
        //   taskData.push({
        //     id: doc.id,
        //     name: doc.data().name,
        //     days: doc.data().days,
        //     section: doc.data().section,
        //     time: doc.data().time,
        //     checked: doc.data().checked
        //   })
        //   console.log(doc.id, " => ", doc.data());
        // });
        // console.log("This is the sections right after the forEach: " + sectionsList)
        // if (sectionsList.includes("Add New")) {
        //   var index = sectionsList.indexOf("Add New");
        //   var sectionsReplace = [...sectionsList.slice(0, index), ...sectionsList.slice(index + 1)];
        //   sectionsReplace.push("Add New");
        //   setSectionsList(sectionsReplace);
        //   console.log("replaced it and added to the end: " + sectionsList)
        // } else {
        //   setSectionsList([...sectionsList, "Add New"]);
        //   console.log("Added it: " + sectionsList)
        // }
        // console.log("sections: " + sectionsList)
        // setTasks(taskData)
        const taskData = []
        snapshot.forEach(doc => {
          if(!sectionsList.includes(doc.data().section)){
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
      })
      .catch(error => {
        console.error("Error getting sub collection: ", error);
      });

    },[rerender])

    return(
      <>
        <Button onClick={addTask} className="addTaskBtn" style={{borderColor: "black"}}>Add Task</Button>
        {tasks.map(task =>(
          <DisplayTask key={task.id} name={task.name} days={task.days} section={task.section} time={task.time} checked={task.checked} setRerender={setRerender} rerender={rerender}/>
        ))}
        {add && <AddTask2 sectionsList={sectionsList} setSectionsList={setSectionsList} add={add} setAdd={setAdd}/>}
      </>
    )
  }

export default GrabData