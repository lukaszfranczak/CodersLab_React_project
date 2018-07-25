import React, { Component } from 'react';
import MovieRow from "../MovieRow/MovieRow";

// Tu wstawić import stylu

// ZROBIĆ - złożyć razem dane z zapytań do dwóch API; w tym momencie iteruję po jednej liście wyników i nie wiem jak by to miało wyglądać gdybym miał mieć dwa źródła danych

class MoviesList extends Component {

    render() {

        let rows = [];

        {this.props.moviesListData.forEach((movie) => {
            rows.push(

                // OMDB
                <MovieRow movieResult={movie}/>

                // // TNDB
                // <div key={movie.id}>
                //     <img src={movie.poster_path}></img>
                //     <p>Title: {movie.original_title}</p>
                //     <p>IMDB rating (1-10): {movie.vote_average}</p>
                // </div>
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