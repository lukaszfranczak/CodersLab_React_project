import React, { Component } from 'react';
import * as firebase from 'firebase';
import MovieRow from "../MovieRow/MovieRow";

// Tu wstawić import stylu

// ZROBIĆ:
// dodać pending zanim się załaduje
// dodać opcję do usunięcia z listy favourites

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