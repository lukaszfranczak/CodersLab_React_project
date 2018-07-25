import React, { Component } from 'react';
// import CatRow from "../CatRow/CatRow";
// import CategoryRow from "../CategoryRow/CategoryRow";


// Tu wstawić import stylu

class MoviesList extends Component {

    render() {

        let rows = [];

        {this.props.moviesListData.forEach((movie) => {
            rows.push(
                <div key={movie.imdbID}>
                    <img src={movie.Poster}></img>
                    <p>Title: {movie.Title}</p>
                    <p>IMDB rating (1-10): {movie.imdbRating}</p>
                </div>
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

export default MoviesList;