import React, { Component } from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import TopRated from "../TopRated/TopRated";
import NotFound from "../NotFound/NotFound";
import MovieFavourites from '../MovieFavourites/MovieFavourites';
import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import './App.scss';

class App extends Component {



    render () {

        return (
            <HashRouter>
                <div>
                    <Header/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route path='/top' component={TopRated}/>
                            <Route path='/favourites' component={MovieFavourites}/>
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