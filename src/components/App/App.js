import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import MoviesList from "../MoviesList/MoviesList";

import './App.scss';

// import firebase from 'firebase';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            userMovies: [],
            // userOMDBMovies: [],
            // userTMDBMovies: [],
            movieInputFilter: ''
        }
    }

    UpdateMovieFilter = (userInput) => {
        this.setState({
            movieInputFilter: userInput
        })
    }

    SearchUserMovie = (userInput) => {

        // OMDB API

        // let movieIndex = 'tt3896198';
        let apiOMDBKey = 'f0b162f1';

        fetch('http://www.omdbapi.com/?t='+userInput+'&apikey='+apiOMDBKey)
        // fetch('http://www.omdbapi.com/?t=guardians&apikey='+apiKey)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    userMovies: this.state.movies.concat(data)
                });
            })
            .catch( err => {
                console.log(err);
            })

        // // TMDB API
        //
        // let apiTMDBKey = 'aaf0a04900e1beb05daf297295010984';
        //
        // fetch('https://api.themoviedb.org/3/movie/550?api_key='+apiTMDBKey)
        // // fetch('http://www.omdbapi.com/?t=guardians&apikey='+apiKey)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         this.setState({
        //             userTMDBMovies: this.state.movies.concat(data)
        //         });
        //     })
        //     .catch( err => {
        //         console.log(err);
        //     })

    }

    render () {
        console.log(this.state.userMovies);
        return (
            <div className="container">
                <h1 className='title'>What should I watch today?</h1>
                <SearchBar value={this.state.movieInputFilter} searchForUserMovie={this.SearchUserMovie} movieFilter={this.UpdateMovieFilter}/>
                <MoviesList moviesListData={this.state.userMovies}/>
            </div>
        )
    }
}

export default App;