import React, { Component } from 'react';
import MovieRow from "../MovieRow/MovieRow";

// Tu wstawić import stylu

class MoviesList extends Component {

    render() {
        let rows = [];
        {this.props.moviesListData.forEach((movie) => {
            rows.push(
                <MovieRow
                    movieResult={movie}
                    AddMovieToFavourites={this.props.AddMovieToFavourites}
                    RemoveMovieFromFavourites={this.props.RemoveMovieFromFavourites}
                    IMDBcheckboxValue={this.props.IMDBcheckboxValue}
                    TNDBcheckboxValue={this.props.TNDBcheckboxValue}
                    loggedUserId={this.props.loggedUserId}
                    key={movie.id}
                />
            )
        });

            return (
                <div>
                    {rows}
                </div>
            )
        }
    }
}

export default MoviesList;