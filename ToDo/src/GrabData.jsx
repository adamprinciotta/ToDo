import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import AddTask from './AddTask.jsx'
import Task from './Task.jsx'
import AddTaskModal from './AddTaskModal'
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
    const dataRef = firestore.collection('ListItem')
    console.log(dataRef)
    //const query = dataRef.orderBy('createdAt')
    //console.log(query)
    // const [items1] = useCollectionData(firestore.collection("ListItem"))
    // console.log(items1)
    // const [items2] = useCollectionData(query, {idField: 'checked'})
    // console.log("items = " + items2)

    const [items3, loading, error] =  useCollectionData(query(collection(firestore, "ListItem"), where("checked", "==", true)));
    console.log(items3)

    // console.log("\n\n\n\n about to greab ref")
    // const ref = query(collection(firestore, 'ListItem'))
    // console.log("REF = " + ref)
    return(
      <>
        <div>{items3 && items3.map(item => <p>Hello there {item.time}</p>)}</div>
      </>
    )
  }

export default GrabData