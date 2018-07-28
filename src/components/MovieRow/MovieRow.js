import React, { Component } from 'react';

// Tu wstawić import stylu

// dodać event na dodawanie danego filmu do ulubionych i zmienić stylowanie gwiazdki

class MovieRow extends Component {
    render() {
        return (
            <div key={this.props.movieResult.id} className='jumbotron row'>
                <div className='col-xs-12 col-sm-4 col-md-4 movieImg'>
                    <img src={this.props.movieResult.poster_path ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+this.props.movieResult.poster_path : null} className='movieImg' width={200}></img>
                </div>
                <div className='col-xs-12 col-sm-8 col-md-8 movieData'>
                    <h2>{this.props.movieResult.title}</h2>
                    <p>⛧ Add to favourites</p>
                    <p>Description: {this.props.movieResult.overview}</p>
                    <p>TNDB rating (1-10): {this.props.movieResult.vote_average}</p>
                    <p>IMDB rating (1-10): {this.props.movieResult.imdbRating}</p>
                </div>
            </div>
        )
    }
}

export default MovieRow;