import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import MoviesList from "../MoviesList/MoviesList";

// Tu wstawić import stylu

// ZROBIĆ:
// dokończyć funkcję RemoveFromFavourites - obecnie nie działa bo jest problem z identyfikatorem użytkownika
// dodać trailery dla filmów w oparciu o zapytanie:
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
// dodać to w dodatkowym komponencie MovieDescription, tak żeby robić zapytanie dla jednego konkretnego filmu

import * as firebase from 'firebase';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userMovies: [],
            pending: false
        }
    }

    AddToFavourites = (data, userId) => {
        const db = firebase.app().database().ref('movies/'+userId);
        db.push(data);
    }

    RemoveFromFavourites = (data, userId) => {
        const db = firebase.app().database().ref('movies/'+userId);
        // db.child('-LJ-wuFdofgjep9RVoiU').remove();       // to działa, ale powinienem dla każdgo pytanie jak namierzyć konkretne dziecko
    }


    SearchUserMovie = (userInput) => {

        this.setState({
            pending: true
        });

        // PONIŻEJ FETCH Z TNDB I ZESTAW FETCHY NA PODSTAWIE JEGO WYNIKÓW

        const apiOMDBKey = 'f0b162f1';
        const apiTMDBKey = 'aaf0a04900e1beb05daf297295010984';
        const linkTMDB = 'https://api.themoviedb.org/3/search/movie?api_key='+apiTMDBKey+'&query='+userInput;

        const TMDBPromise = fetch(linkTMDB).then(res => res.json());

        const OMDBPromise = TMDBPromise
            .then(data => Promise.all(data.results.map(item =>
                fetch(`http://www.omdbapi.com/?t=${item.title}&apikey=${apiOMDBKey}`).then(r => r.json())
            )))

        // const TMDBVideoPromise = TMDBPromise
        //     .then(data => Promise.all(data.results.map(item =>
        //         fetch(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${apiTMDBKey}&language=en-US`).then(r => r.json())
        //     )))

        Promise
            .all([OMDBPromise, TMDBPromise])
            // .all([OMDBPromise, TMDBPromise, TMDBVideoPromise])
            .then(([data1, data2]) => {
            // .then(([data1, data2, data3]) => {

                // Przypisywanie danych z data1 do data2
                data2.results.map( (movieTNDB, index) => {
                    movieTNDB.imdbRating = data1[index].imdbRating
                });

                // // Przypisywanie danych z data3 do data2
                // data2.results.map( (movieTNDB, index) => {
                //     movieTNDB.videoKey = data3[index].key
                // });

                this.setState({
                    userMovies: data2.results,
                    pending: false
                });
            })

    };

    render () {

        if(this.state.pending) {
            return (
                <div className="loader"></div>
            );
        }

        return (
            <div>
                <h1 className='title'>What should I watch today?</h1>
                <SearchBar searchForUserMovie={this.SearchUserMovie}/>
                <MoviesList
                    moviesListData={this.state.userMovies}
                    AddMovieToFavourites={this.AddToFavourites}
                    RemoveMovieFromFavourites={this.RemoveFromFavourites}
                    loggedUserId={this.props.loggedUserId}
                />
            </div>
        )
    }

}

export default Main;