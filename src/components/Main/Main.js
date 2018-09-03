import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import MoviesList from "../MoviesList/MoviesList";

import './Main.scss';

import * as firebase from 'firebase';
import 'whatwg-fetch';

// ZROBIĆ:
// dodać dodatkowe grafiki do tła i zrobić losowanie z dostępnej listy przy każdym nowym wejściu na stronę

// dokończyć funkcję RemoveFromFavourites - obecnie nie działa bo jest problem z identyfikatorem użytkownika

// * dodać trailery dla filmów w oparciu o zapytanie:
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
// dodać to w dodatkowym komponencie MovieDescription, tak żeby robić zapytanie dla jednego konkretnego filmu




class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userMovies: [],
            pending: false,
            IMDBcheckbox: false,
            TNDBcheckbox: false
        }
    }

    AddToFavourites = (data, userId) => {
        const db = firebase.app().database().ref('movies/'+userId);
        db.push(data);
    }

    // RemoveFromFavourites = (data, userId) => {
    //     const db = firebase.app().database().ref('movies/'+userId);
    //     // db.child('-LJ-wuFdofgjep9RVoiU').remove();       // to działa, ale powinienem dla każdgo pytanie jak namierzyć konkretne dziecko
    // }


    SearchUserMovie = (userInput, IMDBcheckboxValue, TNDBcheckboxValue) => {

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
                fetch(`https://www.omdbapi.com/?t=${item.title}&apikey=${apiOMDBKey}`).then(r => r.json())
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
                    if (data1[index].imdbRating) {
                        movieTNDB.imdbRating = data1[index].imdbRating
                    } else {
                        movieTNDB.imdbRating = 'N/A'
                    }                
                });

                // // Przypisywanie danych z data3 do data2
                // data2.results.map( (movieTNDB, index) => {
                //     movieTNDB.videoKey = data3[index].key
                // });

                this.setState({
                    userMovies: data2.results,
                    pending: false,
                    IMDBcheckbox: IMDBcheckboxValue,
                    TNDBcheckbox: TNDBcheckboxValue
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
            <div className='searchBar'>
                <h1 className='title mainTitle'>What should I watch today?</h1>
                <SearchBar searchForUserMovie={this.SearchUserMovie} className='jumbotron'/>
                <MoviesList
                    moviesListData={this.state.userMovies}
                    AddMovieToFavourites={this.AddToFavourites}
                    RemoveMovieFromFavourites={this.RemoveFromFavourites}
                    loggedUserId={this.props.loggedUserId}
                    IMDBcheckboxValue={this.state.IMDBcheckbox}
                    TNDBcheckboxValue={this.state.TNDBcheckbox}
                />
            </div>
        )
    }

}

export default Main;