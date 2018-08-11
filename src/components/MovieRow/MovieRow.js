import React, { Component } from 'react';

import './MovieRow.scss';

// dodać event na dodawanie danego filmu do ulubionych i zmienić stylowanie gwiazdki

class MovieRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLogged: false,
            userId: null,
            disabledButton: false
        }
    }

    AddToFavourites = (e) => {
        e.preventDefault();
        if (typeof this.props.AddMovieToFavourites === 'function') {
            this.props.AddMovieToFavourites(this.props.movieResult, this.state.userId);
        }
        this.setState({
            disabledButton: true
        });
    };

    RemoveFromFavourites = () => {
        if (typeof this.props.RemoveMovieFromFavourites === 'function') {
            this.props.RemoveMovieFromFavourites(this.props.movieResult, this.state.userId);
        }
    };

    componentDidMount() {
        if (this.props.loggedUserId) {
            this.setState({
                isUserLogged: true,
                userId: this.props.loggedUserId
            });
        }
    }

    render() {
        return (
            <div key={this.props.movieResult.id} className='jumbotron movieRow'>
                <div className='movieImg'>
                    <img
                        src={this.props.movieResult.poster_path
                            ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+this.props.movieResult.poster_path
                            : null}
                        className='movieImg' width={200}>
                    </img>
                </div>
                <div className='movieData'>
                    <h2>{this.props.movieResult.title}</h2>
                    <p>Year: {this.props.movieResult.release_date.substring(0,4)}</p>
                    {this.state.isUserLogged
                        ? <button disabled={this.state.disabledButton} onClick={(event) => this.AddToFavourites(event)} type='button' className='btn btn-light favouritesButton'>⛧ Add to favourites</button>
                        : null}
                    {/* {this.state.isUserLogged
                        ? <p onClick={this.RemoveFromFavourites}>⛧ Remove from favourites</p>
                        : null} */}
                    <p>Description: {this.props.movieResult.overview}</p>
                    {this.props.TNDBcheckboxValue
                    ? <p>TNDB rating (1-10): {this.props.movieResult.vote_average}</p>
                    : null}
                    {this.props.IMDBcheckboxValue
                    ? <p>IMDB rating (1-10): {this.props.movieResult.imdbRating}</p>
                    : null}
                </div>
            </div>
        )
    }
}

export default MovieRow;