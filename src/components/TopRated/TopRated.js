import React, { Component } from 'react';
import MoviesList from "../MoviesList/MoviesList";

// Tu wstawić import stylu

// ZROBIĆ:
// dodać pending zanim się załaduje

import * as firebase from 'firebase';

class TopRated extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topRatedMovies: []
        }
    }

    AddToFavourites = (data) => {
        const db = firebase.app().database().ref('movies')
        db.push(data);
    }

    // ZROBIĆ
    // Zmodyfikować tę funkcję w oparciu o to co mamy w Main.js i dodać łączenie danych z różnych API

    componentDidMount() {
        const apiTMDBKey = 'aaf0a04900e1beb05daf297295010984';
        const linkTMDBTopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+apiTMDBKey+'&language=en-US&page=1';

        fetch(linkTMDBTopRated)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    topRatedMovies: data.results
                });
            })
    }

    render () {
        return (
            <div>
                <h1 className='title'>What should I watch today?</h1>
                <MoviesList moviesListData={this.state.topRatedMovies} AddMovieToFavourites={this.AddToFavourites}/>
            </div>
        )
    }

}

export default TopRated;