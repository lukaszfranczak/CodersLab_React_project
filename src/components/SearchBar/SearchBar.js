import React, { Component } from 'react';

import './SearchBar.scss';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieName: ''
        }
    }

    handleInputValue = (event) => {
        this.setState({
            movieName: event.target.value
        })
    };

    searchMovie = (e) => {
        e.preventDefault();
        if (typeof this.props.searchForUserMovie === 'function') {
            this.props.searchForUserMovie(this.state.movieName);
        }
    };

    render () {
        return (
            <form>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='text' placeholder='Movie name' onChange={this.handleInputValue} />
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
                    <button className='btn searchButton' onClick={(event) => this.searchMovie(event)}>Search</button>
                </div>
            </form>
        )
    }
}

export default SearchBar;