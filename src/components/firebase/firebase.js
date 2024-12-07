// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { TypeHTTP, api } from "../../utils/api";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export const firebaseConfig = {
    apiKey: "AIzaSyDcesHdThiEsFH-KCLRmgSJcKooNEo0yx8",
    authDomain: "autonomous-time-443911-i3.firebaseapp.com",
    projectId: "autonomous-time-443911-i3",
    storageBucket: "autonomous-time-443911-i3.firebasestorage.app",
    messagingSenderId: "450494084881",
    appId: "1:450494084881:web:7a37a93d068d4aa2bf3eb0",
    measurementId: "G-6R2WCQ9G9E"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}