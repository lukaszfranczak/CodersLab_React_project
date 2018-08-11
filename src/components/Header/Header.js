import React, { Component } from 'react';

import './Header.scss';

import {
    NavLink
} from 'react-router-dom';


class Header extends Component {

    signOut = () => {
        if (typeof this.props.signOut === 'function') {
            this.props.signOut();
        }
    };

    render() {
        return (
            <ul className='top_header'>
                <li><NavLink exact to='/'>Main page</NavLink></li>
                <li><NavLink to='/top'>Top rated</NavLink></li>
                {<li className='account'>My account
                    <ul className='accountDropdown'>
                        {this.props.isUserLogged ? null : <li><NavLink to='/register'>Register</NavLink></li>}
                        {this.props.isUserLogged ? null : <li><NavLink to='/login'>Log in</NavLink></li>}
                        {this.props.isUserLogged ? <li className='userEmail'>{this.props.loggedUserEmail}</li> : null}
                        {this.props.isUserLogged ? <li><NavLink to='/favourites'>Favourites</NavLink></li> : null}
                        {this.props.isUserLogged ? <li onClick={this.signOut} className='logOutLink'>Log out</li> : null}
                    </ul>
                </li>}

            </ul>
        )
    }
}

export default Header;