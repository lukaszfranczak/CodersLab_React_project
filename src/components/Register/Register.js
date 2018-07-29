import React, { Component } from 'react';
import * as firebase from 'firebase';

// ZROBIĆ
// Dodać walidację na wpisanie dwóch takich samych haseł (to jest w tutorialu z logowania)
// Dodać walidację przy wpisaniu zbyt krótkiego hasła
// Po rejestracji przejść na główną stronę (Route jako element funkcji register?)

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: ''
        }
    }

    handleEmailValue = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    handlePassword1Value = (e) => {
        this.setState({
            password1: e.target.value
        })
    };

    handlePassword2Value = (e) => {
        this.setState({
            password2: e.target.value
        })
    };

    register = (e) => {
        e.preventDefault();
        // Sign Up
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password1).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    };

    render() {
        return (
            <form>
                <h2>Welcome</h2>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='e-mail' placeholder='User e-mail' value={this.state.email} onChange={this.handleEmailValue} />
                </div>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='password' placeholder='Password' value={this.state.password1} onChange={this.handlePassword1Value} />
                </div>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='password' placeholder='Confirm password' value={this.state.password2} onChange={this.handlePassword2Value} />
                </div>
                <div>
                    <button className='btn searchButton' onClick={this.register}>Register</button>
                </div>
            </form>
        )
    }
}

export default Register;