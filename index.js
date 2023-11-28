// We need to set up a firebase database to store data from user comments.

// Each time a user enters praise in the textarea and presses the Publish button, the database needs to create an ID

// The user who enters the comment should be able to remove their comment. 

// The comment needs to be added to the "endorsements" section in the DOM

// If possible the latest comment should be at the top - displayed in reverse order (time stamp?)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHDwLNAGMcLRmt_hU2UM6ufa_f35cT6IY",
  authDomain: "we-are-the-champions-cr.firebaseapp.com",
  databaseURL: "https://we-are-the-champions-cr-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "we-are-the-champions-cr",
  storageBucket: "we-are-the-champions-cr.appspot.com",
  messagingSenderId: "246179327076",
  appId: "1:246179327076:web:08d9b1416df5db67ee0371",
  measurementId: "G-3JE85HVJPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);