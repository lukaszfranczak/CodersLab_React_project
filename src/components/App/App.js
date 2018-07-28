import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import MoviesList from "../MoviesList/MoviesList";
import MovieFavourites from '../MovieFavourites/MovieFavourites';

import './App.scss';

import * as firebase from 'firebase';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            userMovies: [],
            topRatedMovies: []
        }
    }

    // Funkcja ShowTopRated pokaże się po kliknięciu na dodatkowy button "Pokaż najlepsze filmy"

    // ShowTopRated = () => {
    //
    //     // // TMDB API
    //
    //     const apiTMDBKey = 'aaf0a04900e1beb05daf297295010984';
    //     const linkTMDB = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+apiTMDBKey+'&language=en-US&page=1';
    //
    //     fetch(linkTMDB)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             this.setState({
    //                 topRatedMovies: data
    //             });
    //         })
    //         .catch( err => {
    //             console.log(err);
    //         })
    // }

    SearchUserMovie = (userInput) => {

        // OMDB API

        // PRZEROBIĆ PONIŻSZY KOD I ZROBIĆ Z TEGO FUNKCJĘ ADDTOFAVOURITES GDZIE POD PUSH BĘDZIE KONKRETNY FILM ZAZNACZONY PRZEZ USERA GWIAZDKĄ (EVENT)

        // const apiOMDBKey = 'f0b162f1';
        // const linkOMDB = 'http://www.omdbapi.com/?t='+userInput+'&apikey='+apiOMDBKey;
        //
        // fetch(linkOMDB)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         this.setState({
        //             userMovies: this.state.movies.concat(data)
        //         });
        //
        //         const db = firebase.app().database().ref('movies')
        //         db.push(data);
        //     })
        //     .catch( err => {
        //         console.log(err);
        //     })


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

    // W RENDER DODAC ROUTE W ZALEŻNOŚCI OD TEGO CZY WYŚWIETLAMY TOP RATED CZY PO WYSZUKANIU PRZEZ USERA
    // DODATKOWO DODAĆ TEŻ PRZEJŚCIE NA PODSTRONĘ Z ULUBIONYMI

    render () {

        return (
            <div className="container">
                <h1 className='title'>What should I watch today?</h1>
                <SearchBar searchForUserMovie={this.SearchUserMovie}/>
                <MoviesList moviesListData={this.state.userMovies}/>
                <MovieFavourites />
            </div>
        )
    }
}

export default App;