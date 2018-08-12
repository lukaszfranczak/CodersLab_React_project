import React, { Component } from 'react';
import Header from 'Components/Header/Header';
import Main from 'Components/Main/Main';
import TopRated from 'Components/TopRated/TopRated';
import NotFound from 'Components/NotFound/NotFound';
import MovieFavourites from 'Components/MovieFavourites/MovieFavourites';
import Register from 'Components/Register/Register';
import LogIn from 'Components/LogIn/LogIn';

import * as firebase from 'firebase';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedUser: '',
            isUserLogged: false,
            pending: true
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.setState({
                    loggedUser: {
                        email: user.email,
                        userId: user.uid
                    },
                    isUserLogged: true,
                    pending: false
                })
            } else {
                this.setState({
                    pending: false
                })
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

    componentWillUnmount() {
        this.authSubscription();
    }

    render () {

        if (this.state.pending) {
            return (
                <HashRouter>
                    <div>
                        <Header />
                    </div>
                </HashRouter>
            )
        }

        return (
            <HashRouter>
                <div>
                    <Header isUserLogged={this.state.isUserLogged} loggedUserEmail={this.state.loggedUser.email} signOut={this.signOut}/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' render={ () => <Main loggedUserId={this.state.loggedUser.userId} />}/>
                            <Route path='/top' render={ () => <TopRated loggedUserId={this.state.loggedUser.userId} />}/>
                            <Route path='/favourites' render={ () => <MovieFavourites loggedUserId={this.state.loggedUser.userId} source='favourites'/>}/>
                            <Route path='/register' component={Register}/>
                            <Route path='/login' component={LogIn}/>
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default App;