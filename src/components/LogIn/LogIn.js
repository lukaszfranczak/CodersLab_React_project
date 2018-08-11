import React, { Component } from 'react';
import * as firebase from 'firebase';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmailValue = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    handlePasswordValue = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    login = (e) => {
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/');
            })
            .catch((error) => {
               // Handle Errors here.
               var errorCode = error.code;
               var errorMessage = error.message;
               alert(errorCode, errorMessage);
        });
    };

    render() {

        // Button disable

        const {email, password} = this.state;

        let isInvalid =
            password === '' ||
            email === '';

        return (
            <form>
                <h2 className='title mainTitle'>Welcome</h2>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='e-mail' placeholder='User e-mail' value={this.state.email} onChange={this.handleEmailValue} />
                </div>
                <div className='form-group text-center'>
                    <input className='form-control searchInput' type='password' placeholder='Password' value={this.state.password} onChange={this.handlePasswordValue} />
                </div>
                <div className='form-group text-center'>
                    <button disabled={isInvalid} className='btn searchButton' onClick={this.login}>Log in</button>
                </div>
            </form>
        )
    }
}

export default LogIn;