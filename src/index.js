import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase';

import {
    HashRouter,
    Route,
    Switch,
    Link,
    NavLink
} from 'react-router-dom';

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

import App from "./components/App/App";

ReactDOM.render(
    <App />,
    document.getElementById("app")
);