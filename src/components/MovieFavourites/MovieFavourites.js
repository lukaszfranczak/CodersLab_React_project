import React, { Component } from 'react';
import * as firebase from 'firebase';
import MovieRow from "../MovieRow/MovieRow";

import './MovieFavourites.scss';

class MovieFavourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteMovies: [],
            pending: true
        }
    }

    componentDidMount() {
        var db = firebase.app().database().ref('movies/' + this.props.loggedUserId)
        console.log(db);

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
                <MovieRow 
                    movieResult={movie} 
                    key={movie.id} 
                    IMDBcheckboxValue={true} 
                    TNDBcheckboxValue={true}
                    source={this.props.favourites}
                />
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