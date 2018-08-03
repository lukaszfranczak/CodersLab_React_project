import React, { Component } from 'react';

import * as firebase from 'firebase';


import {
    NavLink
} from 'react-router-dom';

// ZROBIĆ:
// header zrobić jako przyczepiony panel na samej górze strony (position: fixed)
// po wylogowaniu wyczyścić dane wpisane przez usera
// zamiast Favourites i Log out zrobić jedną listę My account po najechaniu którego dopiero pokażą się Favourites i Log out

class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loggedUser: null,
            isUserLogged: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.setState({
                    loggedUser: {
                        email: user.email
                    },
                    isUserLogged: true
                })

                // If logged in - send user id to app component so that other components are rendered accordingly
                if (typeof this.props.fetchUserEmail === 'function') {
                    this.props.fetchUserEmail(user.uid);
                }

                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var isAnonymous = user.isAnonymous;
                // var uid = user.uid;
                // var providerData = user.providerData;
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    }

    signOut = () => {
        firebase.auth().signOut()

        this.setState({
            isUserLogged: false
        })

        window.location.replace('/#/');
    }

    render() {

        return (
            <ul>
                <li><NavLink exact to='/'>Main page</NavLink></li>
                <li><NavLink to='/top'>Top rated</NavLink></li>
                {this.state.isUserLogged ? <li><NavLink to='/favourites'>Favourites</NavLink></li> : null}
                {this.state.isUserLogged ? null : <li><NavLink to='/register'>Register</NavLink></li>}
                {this.state.isUserLogged ? null : <li><NavLink to='/login'>Log in</NavLink></li>}
                {this.state.isUserLogged ? <li>{this.state.loggedUser.email}</li> : null}
                {this.state.isUserLogged ? <li onClick={this.signOut}>Log out</li> : null}
            </ul>
        )
    }
}

export default Header;