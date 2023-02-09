import { useState } from 'react'
import './Task.css'
import Button from 'react-bootstrap/Button'
import editImage from './edit.png'
import trashImage from './trash.png'

import './displayTask.css'

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

    const [deleteModal, setDeleteModal] = useState(false)

    const [hourToDisplay, setHourToDisplay] = useState('')

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
        console.log("This is props.days: " + props.days)
        if(displayBool == 0 && props.days !== "0000000"){
            setShouldDisplay(false)
        }
        else{
            setShouldDisplay(true)
        }

        var time = props.time.split('')
        var hour = props.time.substring(0, 2)
        var AMPM = 'AM'
        var parseHour = parseInt(hour)
        if(parseHour > 12){
            var AMPM = 'PM'
            hour -= 12
        }
        var mins = props.time.substring(3, 5)
        setHourToDisplay(hour + ':' + mins + AMPM)
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

    function edit(){
        props.setTaskToEdit({
                days: props.days,
                name: props.name,
                section: props.section,
                time: props.time,
                checked: props.checked
        })
        props.setEditTask(true)
    }

    function deleteTask(){
        console.log("deleteTask")
        setDeleteModal(true)
    }

    function handleNo(){
        setDeleteModal(false)
    }

    function handleYes(){
        setDeleteModal(false)
        props.handleDelete(props.name)
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
                  <div className="timeAndSection">
                  <div className='time'>{hourToDisplay}</div>
                  <div className="sectionName">
                    {props.section}
                  </div>
                </div>
                  {/* style={{alignSelf: 'flex-end'}} */}
                  
              </div>
              <div className='spacerSide' style={{paddingLeft: "10px"}}></div>
              {/* style={{position: 'relative', right: '-50px'}} */}
              
              <div className='spacerSide' style={{paddingLeft: "10px"}}></div>
              <div className="buttons">
                <img onClick={edit} src={editImage} width="50px" height="50px"></img>
                <img onClick={deleteTask} src={trashImage} width="50px" height="50px"></img>
              </div>
            </div>
            <div className='spacer' style={{paddingTop: "15px"}}></div>
            </>
      </div>)}
      {deleteModal && 
      <div className="deleteModal">
        <div className='verify'>Are you sure you want to delete this?</div>
        <br></br>
        <div className="choice">
            <div onClick = {handleNo}setclassName='No'><Button className='btn btn-danger'>No</Button></div>
            <div onClick = {handleYes}className='yes'><Button className='btn btn-success'>Yes</Button></div>
        </div>
      </div>}
      </>
    )
}

export default DisplayTask