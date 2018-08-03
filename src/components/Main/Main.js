import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import MoviesList from "../MoviesList/MoviesList";

// Tu wstawić import stylu

import * as firebase from 'firebase';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userMovies: []
        }
    }

    AddToFavourites = (data, userId) => {
        const db = firebase.app().database().ref('movies/'+userId);
        db.push(data);
    }

    SearchUserMovie = (userInput) => {

        // PONIŻEJ FETCH Z TNDB I ZESTAW FETCHY NA PODSTAWIE JEGO WYNIKÓW

        const apiOMDBKey = 'f0b162f1';
        const apiTMDBKey = 'aaf0a04900e1beb05daf297295010984';
        const linkTMDB = 'https://api.themoviedb.org/3/search/movie?api_key='+apiTMDBKey+'&query='+userInput;

        const TMDBPromise = fetch(linkTMDB).then(res => res.json());

        const OMDBPromise = TMDBPromise
            .then(data => Promise.all(data.results.map(item =>
                fetch(`http://www.omdbapi.com/?t=${item.title}&apikey=${apiOMDBKey}`).then(r => r.json())
            )))

        Promise
            .all([OMDBPromise, TMDBPromise])
            .then(([data1, data2]) => {

                // Przypisywanie danych z data1 do data2
                data2.results.map( (movieTNDB, index) => {
                    movieTNDB.imdbRating = data1[index].imdbRating
                });

                this.setState({
                    userMovies: data2.results
                });
            })

    };

    render () {
        return (
            <div>
                <h1 className='title'>What should I watch today?</h1>
                <SearchBar searchForUserMovie={this.SearchUserMovie}/>
                <MoviesList moviesListData={this.state.userMovies} AddMovieToFavourites={this.AddToFavourites} loggedUserId={this.props.loggedUserId}/>
            </div>
        )
    }

}

export default Main;