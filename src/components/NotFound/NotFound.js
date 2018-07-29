import React, { Component } from 'react';

// dodać style dla obrazka i w ten sposób przysłonić nim całą stronę
// position fixed i wszystkie atrybuty na 0
// zmienić też height i width na 100%

class NotFound extends Component {
    render() {

        return (
            <div>
                <img src='../src/images/theend.png' width={800}></img>
            </div>
        )
    }
}

export default NotFound;