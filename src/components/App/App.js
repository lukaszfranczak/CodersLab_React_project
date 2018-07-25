import React, { Component } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import MoviesList from "../MoviesList/MoviesList";

// Tu wstawić import stylu

// import firebase from 'firebase';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            userMovies: []
        }
    }

    SearchUserMovie = (userInput) => {

        // let movieIndex = 'tt3896198';
        let apiKey = 'f0b162f1';

        fetch('http://www.omdbapi.com/?t='+userInput+'&apikey='+apiKey)
        // fetch('http://www.omdbapi.com/?t=guardians&apikey='+apiKey)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    userMovies: this.state.movies.concat(data)
                });
            })
            .catch( err => {
                console.log(err);
            })
    }

    // componentDidMount() {
    //
    //     let movieIndex = 'tt3896198';
    //     let apiKey = 'f0b162f1';
    //
    //     fetch('http://www.omdbapi.com/?i='+movieIndex+'&apikey='+apiKey)
    //     // fetch('http://www.omdbapi.com/?t=guardians&apikey='+apiKey)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             this.setState({
    //                 movies: this.state.movies.concat(data)
    //             });
    //         })
    // }

    render () {
        console.log(this.state.userMovies);
        return (
            <div>
                <SearchBar searchForUserMovie={this.SearchUserMovie}/>
                <MoviesList moviesListData={this.state.userMovies}/>
            </div>
        )
    }
}

export default App;