import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase';

// import 'whatwg-fetch';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCpCYIbannStAwc9tiaoVJHmVjgvwNJ_yk",
    authDomain: "movie-aggregator.firebaseapp.com",
    databaseURL: "https://movie-aggregator.firebaseio.com",
    projectId: "movie-aggregator",
    storageBucket: "movie-aggregator.appspot.com",
    messagingSenderId: "869401159487"
};
firebase.initializeApp(config);

const auth = firebase.auth();
// console.log(auth);

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
// console.log(doCreateUserWithEmailAndPassword);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);
// console.log(doSignInWithEmailAndPassword);

// Sign out
export const doSignOut = () =>
    auth.signOut();
// console.log(doSignOut);

import App from "./components/App/App";

ReactDOM.render(
    <App />,
    document.getElementById("app")
);