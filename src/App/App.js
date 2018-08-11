import React, { Component } from 'react';
import Header from 'Components/Header/Header';
import Main from 'Components/Main/Main';
import TopRated from 'Components/TopRated/TopRated';
import NotFound from 'Components/NotFound/NotFound';
import MovieFavourites from 'Components/MovieFavourites/MovieFavourites';
import Register from 'Components/Register/Register';
import LogIn from 'Components/LogIn/LogIn';


import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import './App.scss';

// ZROBIĆ
// dodać losowanie tła

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: ''
        }
    }

    handleUserId = (user) => {
        this.setState({
            userId: user
        })
    };

    render () {

        return (
            <HashRouter>
                <div>
                    <Header fetchUserEmail={this.handleUserId} />
                    <div className="container">
                        <Switch>
                            <Route exact path='/' render={ () => <Main loggedUserId={this.state.userId} />}/>
                            <Route path='/top' render={ () => <TopRated loggedUserId={this.state.userId} />}/>
                            <Route path='/favourites' render={ () => <MovieFavourites loggedUserId={this.state.userId} />}/>
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