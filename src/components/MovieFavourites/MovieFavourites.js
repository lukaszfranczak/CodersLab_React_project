import React, { Component } from 'react';
import * as firebase from 'firebase';
import MovieRow from "../MovieRow/MovieRow";

// Tu wstawić import stylu

// ULUBIONE:
// dodać dodatkowy panel tylko z ulubionymi (Route);
// obecnie ulubione są wrzucane bezpośrednio do App - wyrzucić to stamtąd i przerzucić do panelu
// dodać pending zanim się załaduje

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
                <MovieRow movieResult={movie}/>
            )
        })

        return (
            <div>
                {rows}
            </div>
        )
        }
    }
}

export default MovieFavourites;