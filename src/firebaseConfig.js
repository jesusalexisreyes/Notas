




import * as firebase from "firebase";
import "firebase/auth";
//import dataConfig from './dataConfig'

const firebaseConfig =
    {
        apiKey: "AIzaSyCVOaM-NqO4GJ3mOYL9yuR2lF5zDnZMrJc",
        authDomain: "login-817f3.firebaseapp.com",
        databaseURL: "https://login-817f3.firebaseio.com",
        projectId: "login-817f3",
        storageBucket: "login-817f3.appspot.com",
        messagingSenderId: "1006812470021",
        appId: "1:1006812470021:web:59e34696beef2fdd73756c",
        measurementId: "G-QH6LGEC2E3"
        
    };

    firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
  db,
  googleAuthProvider,
  firebase
}

/*const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();*/

 // Initialize Firebase


 /*const db= firebase.firestore();
 const googleAuthProvider= new firebase.auth.GoogleAuthProvider();
 */

