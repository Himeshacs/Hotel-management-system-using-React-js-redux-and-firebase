import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var fbConfig = {
  apiKey: "AIzaSyBQDzzeftnAuUXqKfG6c5hyUaaMkQ8_DX8",
  authDomain: "cool-beach-b9ebb.firebaseapp.com",
  databaseURL: "https://cool-beach-b9ebb.firebaseio.com",
  projectId: "cool-beach-b9ebb",
  storageBucket: "cool-beach-b9ebb.appspot.com",
  messagingSenderId: "102231671908",
  appId: "1:102231671908:web:2a091f9dd29bfd23f78b71",
  measurementId: "G-NK58P2CCVQ"
  };
  // Initialize Firebase
  firebase.initializeApp(fbConfig);
  export const db = firebase.firestore();
  export default firebase;