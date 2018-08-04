import React, { Component } from 'react';
import * as firebase from 'firebase';
import MovieRow from "../MovieRow/MovieRow";

import './MovieFavourites.scss';

// ZROBIĆ:
// dodać informację o źródle danego filmu i jeśli dany film jest z komponentu MovieFavourites to ukryć opcję Add to favourites

class MovieFavourites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favouriteMovies: [],
            pending: true
        }
    }

    componentWillMount() {
        var db = firebase.app().database().ref('movies/'+this.props.loggedUserId)

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


        if(this.state.pending) {
            return (
                <div className="loader"></div>
            );
        }

        return (
            <div>
                <h1 className='title mainTitle'>My favourite movies</h1>
                {rows}
            </div>
        )
        }
    }
}

export default MovieFavourites;