import React, { Component } from 'react';
import * as firebase from 'firebase';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
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

        const {password1, password2} = this.state;
        password1 === password2
            ? // Sign Up
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password1)
                    .then(() => {
                        this.props.history.push('/');
                    })
                    .catch((error) => {
                    // Handle Errors here.
                    var errorMessage = error.message;
                    alert(errorMessage);
                })
            : alert('Passwords must be the same');

    };

    render() {

        // Button disable

        const {email, password1, password2} = this.state;

        let isInvalid =
            password1 === '' ||
            password2 === '' ||
            email === '';

        return (
            <form>
                <h2 className='title mainTitle'>Welcome</h2>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='e-mail' placeholder='User e-mail' value={this.state.email} onChange={this.handleEmailValue} />
                </div>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='password' placeholder='Password' value={this.state.password1} onChange={this.handlePassword1Value} />
                </div>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='password' placeholder='Confirm password' value={this.state.password2} onChange={this.handlePassword2Value} />
                </div>
                <div className='form-group text-center'>
                    <button disabled={isInvalid} className='btn searchButton' onClick={this.register}>Register</button>
                </div>
            </form>
        )
    }
}

export default Register;