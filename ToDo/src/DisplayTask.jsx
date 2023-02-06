import { useState } from 'react'
import './Task.css'
import Button from 'react-bootstrap/Button'
import edit from './edit.png'

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


function DisplayTask(props) {

    const { uid } = auth.currentUser
    
    const [shouldDisplay, setShouldDisplay] = useState(false)

    useEffect(() => {
        checkShouldDisplay()
        console.log("TASK NAME: " + props.name)
        // console.log("TASK SECTION: " + props.section)
        // console.log("TASK TIME: " + props.time)
        // console.log("TASK DAYS: " + props.days)
    }, [props.rerenderDisplay, props.rerender])

    function checkShouldDisplay(){
        const splitDays = props.days.split('')
        const displayBool = splitDays[props.day]
        if(displayBool == 0){
            setShouldDisplay(false)
        }
        else{
            setShouldDisplay(true)
        }
        console.log("SHOULD I DISPLAY " + props.name + " TODAY : " + shouldDisplay)
    }




    function handleChecked(){
        if(props.checked){
            console.log("clicked while true")
            firestore.collection("ListItem").doc(uid).collection("Tasks").doc(props.name).update({
                days: props.days,
                name: props.name,
                section: props.section,
                time: props.time,
                checked: false
            })
        }
        else{
            console.log("clicked while false")
            firestore.collection("ListItem").doc(uid).collection("Tasks").doc(props.name).update({
                days: props.days,
                name: props.name,
                section: props.section,
                time: props.time,
                checked: true
            })
        }
        props.setRerender(!props.rerender)
    }

    function sayHi(){
        console.log("HI :)")
    }

    return(
        <>
        {shouldDisplay &&
        (<div>
            <>
            <div className="taskContainer">
                <div className="task">
                  {/* Checkbox input */}
                  <input 
                  className="checkboxStyle"
                  type="checkbox"
                  checked={props.checked}
                  onChange={() => handleChecked()}
                  /> 
                  <div className="taskName" style={{
                      textDecoration: props.checked ? "line-through" : "none", paddingLeft: "20px" }}>{props.name}
                  </div>
              </div>
              <div className="sectionName" style={{position: 'relative', right: '-50px'}}>
                    {props.section}
              </div>
              <div className='spacer' style={{paddingTop: "15px"}}></div>
              <div className="buttons">
                <img onClick={sayHi} src={edit} width="50" height="50"></img>
                <img onClick={sayHi} src="https://cdn.icon-icons.com/icons2/1919/PNG/512/biggarbagebin_121980.png" width="50" height="50"></img>
              </div>
            </div>
            <div className='spacer' style={{paddingTop: "15px"}}></div>
            
            </>
      </div>)}
      </>
    )
}

export default DisplayTask