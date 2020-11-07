import firebase from  'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAU_qOLVM9_lLmkAdqZ_iHRhEM1_yLMRoc",
    authDomain: "react-app-cursos-d6169.firebaseapp.com",
    databaseURL: "https://react-app-cursos-d6169.firebaseio.com",
    projectId: "react-app-cursos-d6169",
    storageBucket: "react-app-cursos-d6169.appspot.com",
    messagingSenderId: "459331617712",
    appId: "1:459331617712:web:3df9164756b0a20c164c75"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db= firebase.firestore();
  const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

  export{
    db,
    googleAuthProvider,
    firebase
  }