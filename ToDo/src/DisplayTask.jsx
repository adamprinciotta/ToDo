import { useState } from 'react'
import './Task.css'
import Button from 'react-bootstrap/Button'

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

    const splitDays = props.days.split('')
    
    const [shouldDisplay, setShouldDisplay] = useState(false)

    useEffect(() => {
        checkShouldDisplay()
    })

    function checkShouldDisplay(){
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

    console.log("made it to display task")
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
            </div>
            <div className='spacer' style={{paddingTop: "15px"}}></div>
            </>
      </div>)}
      </>
    )
}

export default DisplayTask