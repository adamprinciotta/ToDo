import { FirebaseError } from "firebase/app"

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new FirebaseError.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    } 
    return(
        <button onClick = {signInWithGoogle}>Sign in with Google</button>
    )
}

export default SignIn