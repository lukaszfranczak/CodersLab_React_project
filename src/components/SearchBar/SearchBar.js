import React, { Component } from 'react';

import './SearchBar.scss';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            IMDBcheckbox: false,
            TNDBcheckbox: false
        }
    }

    handleInputValue = (event) => {
        this.setState({
            movieName: event.target.value
        })
    };

    handleIMDBCheckbox = () => {
        this.setState({
            IMDBcheckbox: this.state.IMDBcheckbox==false ? true : false
        })
    };

    handleTNDBCheckbox = () => {
        this.setState({
            TNDBcheckbox: this.state.TNDBcheckbox==false ? true : false
        })
    };

    searchMovie = (e) => {
        const { movieName, IMDBcheckbox, TNDBcheckbox} = this.state;
        e.preventDefault();
        if (typeof this.props.searchForUserMovie === 'function') {
            this.props.searchForUserMovie(movieName, IMDBcheckbox, TNDBcheckbox);
        }
    };

    render () {
        return (
            <form>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='text' placeholder='Movie name' onChange={this.handleInputValue} />
                </div>
                <div className='form-check'>
                    <label className='form-check-label checkBox checkBoxLabels'>
                        <input className='form-check-input' type='checkbox' onChange={this.handleIMDBCheckbox} />
                        IMDB data
                    </label>
                    <label className='form-check-label checkBox checkBoxLabels'>
                        <input className='form-check-input' type='checkbox' onChange={this.handleTNDBCheckbox} />
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