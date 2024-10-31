import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';  // This line is added for firebase storage

const firebaseConfig = {
  apiKey: "AIzaSyAxvgDk1lNDQWOlprCibt7mkGCPwKsw5_Y",
  authDomain: "onlinenoodle-c7b8b.firebaseapp.com",
  databaseURL: "https://onlinenoodle-c7b8b-default-rtdb.firebaseio.com",
  projectId: "onlinenoodle-c7b8b",
  storageBucket: "onlinenoodle-c7b8b.appspot.com",
  messagingSenderId: "547348314049",
  appId: "1:547348314049:web:141d06dba160e2f42ae140",
  measurementId: "G-HMN04ZTFDW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth, firebase };  // 'firebase' is added here
