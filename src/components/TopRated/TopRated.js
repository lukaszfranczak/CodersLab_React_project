import React, { Component } from 'react';
import MoviesList from "../MoviesList/MoviesList";

import './TopRated.scss';

import * as firebase from 'firebase';


// ZROBIĆ:
// Dodać funkcję RemoveFromFavourites (taką samą jak w Main)

class TopRated extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topRatedMovies: [],
            pending: true
        }
    }

    AddToFavourites = (data, userId) => {
        const db = firebase.app().database().ref('movies/'+userId);
        db.push(data);
    }

    componentDidMount() {
        const apiOMDBKey = 'f0b162f1';
        const apiTMDBKey = 'aaf0a04900e1beb05daf297295010984';
        const llinkTMDBTopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+apiTMDBKey+'&language=en-US&page=1';

        const TMDBPromise = fetch(llinkTMDBTopRated).then(res => res.json());

        const OMDBPromise = TMDBPromise
            .then(data => Promise.all(data.results.map(item =>
                fetch(`http://www.omdbapi.com/?t=${item.title}&apikey=${apiOMDBKey}`).then(r => r.json())
            )))

        Promise
            .all([OMDBPromise, TMDBPromise])
            .then(([data1, data2]) => {

                // Przypisywanie danych z data1 do data2
                data2.results.map( (movieTNDB, index) => {
                    if (data1[index].imdbRating) {
                        movieTNDB.imdbRating = data1[index].imdbRating
                    } else {
                        movieTNDB.imdbRating = 'N/A'
                    }
                });

                this.setState({
                    topRatedMovies: data2.results,
                    pending: false
                });
            })
    }


    render () {

        if(this.state.pending) {
            return (
                <div className="loader"></div>
            );
        }

        return (
           <div>
               <h1 className='title mainTitle'>Top rated movies</h1>
               <MoviesList
                    moviesListData={this.state.topRatedMovies}
                    AddMovieToFavourites={this.AddToFavourites}
                    RemoveMovieFromFavourites={this.RemoveFromFavourites}
                    loggedUserId={this.props.loggedUserId}
                    IMDBcheckboxValue={true} 
                    TNDBcheckboxValue={true}
               />
           </div>
        )
    }

}

export default TopRated;