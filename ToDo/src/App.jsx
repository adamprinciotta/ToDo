import { useState } from 'react'
import './App.css'
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

import GrabData from './GrabData';

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


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()} style={{color: 'white', backgroundColor: '#192A51',position: 'absolute', top: '0', right: '0', marginRight: '10px', marginTop: '10px'}}>Sign Out</button>
  )
}



function App() {
  
  const [user] = useAuthState(auth)
  
  return (
    <>
    <section style={{height: '100vh'}}>
      {user ? 
      <div className="fullPage" style={{height: '100vh'}}>
        <SignOut/>
        <GrabData/>
      </div> : <SignIn/>}
    </section>
    </>
  )
}



export default App
