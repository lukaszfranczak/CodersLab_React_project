import React, { Component } from 'react';

// Tu wstawić import stylu

class SearchBar extends Component {

    searchMovie = (e, movieTitle) => {
        e.preventDefault();
        if (typeof this.props.searchForUserMovie === 'function') {
            this.props.searchForUserMovie(movieTitle);
        }
    };

    // ZROBIĆ - rozkminić przekazywanie wartości wpisanej przez użytkownika z drugiego inputu do pierwszego

    render () {
        return (
            <form>
                <input type='text' placeholder='Movie name' />
                <input type='submit' value='Search' onClick={(event) => this.searchMovie(event, event.target.value)}/>
            </form>
        )
    }
}

export default SearchBar;