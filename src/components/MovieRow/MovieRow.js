import React, { Component } from 'react';

// Tu wstawić import stylu

class MovieRow extends Component {
    render() {
        return (
            <div key={this.props.movieResult.imdbID} className='jumbotron row'>
                <div className='col-xs-12 col-sm-4 col-md-4 movieImg'>
                    <img src={this.props.movieResult.Poster} className='movieImg' width={200}></img>
                </div>
                <div className='col-xs-12 col-sm-8 col-md-8 movieData'>
                    <h2>{this.props.movieResult.Title}</h2>
                    <p>Description: {this.props.movieResult.Plot}</p>
                    <p>IMDB rating (1-10): {this.props.movieResult.imdbRating}</p>
                </div>
            </div>
        )
    }
}

export default MovieRow;