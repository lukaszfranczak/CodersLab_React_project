import React, { Component } from 'react';

import './SearchBar.scss';

class SearchBar extends Component {

    handleInputValue = (userInput) => {
        if (typeof this.props.movieFilter === 'function') {
            this.props.movieFilter(userInput);
        }
    };

    searchMovie = (e, movieTitle) => {
        e.preventDefault();
        if (typeof this.props.searchForUserMovie === 'function') {
            this.props.searchForUserMovie(movieTitle);
        }
    };

    // NIE DZIAŁA - przy przekazywaniu wartości pojawia się [object object]

    render () {
        return (
            <form>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='text' placeholder='Movie name' value={this.props.value} onChange={this.handleInputValue} />
                </div>
                <div className='form-check'>
                    <label className='form-check-label checkBox'>
                        <input className='form-check-input' type='checkbox' />
                        IMDB data
                    </label>
                    <label className='form-check-label checkBox'>
                        <input className='form-check-input' type='checkbox' />
                        TMDB data
                    </label>
                </div>
                <div className='form-group text-center'>
                    <input className='btn searchButton ' type='submit' value='Search' onClick={(event) => this.searchMovie(event, event.target.value)}/>
                </div>
            </form>
        )
    }
}

export default SearchBar;