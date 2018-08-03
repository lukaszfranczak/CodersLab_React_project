import React, { Component } from 'react';
import * as firebase from 'firebase';
import MovieRow from "../MovieRow/MovieRow";

// Tu wstawić import stylu

// ZROBIĆ:
// dodać pending zanim się załaduje
// dodać opcję do usunięcia z listy favourites
// do każdego dodawanego filmu do favourites dodać tablicę id, którą później będe filtrował po userze i ten przefiltrowany wynik będę pokazywał jako favourites danego usera

class MovieFavourites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favouriteMovies: [],
            pending: true
        }
    }

    componentDidMount() {
        var db = firebase.app().database().ref('movies')

        db.on('value', (dataFromFB) => {
            const fb = dataFromFB.val();
            let data = [];

            for (let key in fb) {
                data.push(fb[key])
            }

            this.setState({
                favouriteMovies: data,
                pending: false
            })
        })

    }

    render() {
        let rows = [];
        {this.state.favouriteMovies.forEach((movie) => {
            rows.push(
                <MovieRow movieResult={movie} key={movie.id}/>
            )
        })

        return (
            <div>
                <h1 className='title'>What should I watch today?</h1>
                {rows}
            </div>
        )
        }
    }
}

export default MovieFavourites;