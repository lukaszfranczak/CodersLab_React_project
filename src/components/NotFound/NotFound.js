import React, { Component } from 'react';

import './NotFound.scss';

class NotFound extends Component {
    render() {

        return (
            <div className='notFoundBackground'>
                <p className='notFoundText'>
                    404 
                    <br></br> 
                    The End
                </p>
            </div>
        )
    }
}

export default NotFound;