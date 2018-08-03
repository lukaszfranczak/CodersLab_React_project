import React, { Component } from 'react';

// Tu wstawić import stylu

// dodać event na dodawanie danego filmu do ulubionych i zmienić stylowanie gwiazdki

class MovieRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLogged: false,
            userId: ''
        }
    }

    AddToFavourites = () => {
        if (typeof this.props.AddMovieToFavourites === 'function') {
            this.props.AddMovieToFavourites(this.props.movieResult, this.state.userId);
        }
    };

    RemoveFromFavourites = () => {
        if (typeof this.props.RemoveMovieFromFavourites === 'function') {
            this.props.RemoveMovieFromFavourites(this.props.movieResult, this.state.userId);
        }
    };

    componentDidMount() {
        if (this.props.loggedUserId !== '') {
            this.setState({
                isUserLogged: true,
                userId: this.props.loggedUserId
            });
        }
    }

    render() {
        return (
            <div key={this.props.movieResult.id} className='jumbotron row'>
                <div className='col-xs-12 col-sm-4 col-md-4 movieImg'>
                    <img
                        src={this.props.movieResult.poster_path
                            ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+this.props.movieResult.poster_path
                            : null}
                        className='movieImg' width={200}>
                    </img>
                </div>
                <div className='col-xs-12 col-sm-8 col-md-8 movieData'>
                    <h2>{this.props.movieResult.title}</h2>
                    {this.state.isUserLogged
                        ? <p onClick={this.AddToFavourites}>⛧ Add to favourites</p>
                        : null}
                    {this.state.isUserLogged
                        ? <p onClick={this.RemoveFromFavourites}>⛧ Remove from favourites</p>
                        : null}
                    <p>Description: {this.props.movieResult.overview}</p>
                    <p>TNDB rating (1-10): {this.props.movieResult.vote_average}</p>
                    <p>IMDB rating (1-10): {this.props.movieResult.imdbRating}</p>
                </div>
            </div>
        )
    }
}

export default MovieRow;