import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter,
    Route,
    Switch,
    Link,
    NavLink
} from 'react-router-dom';


// import 'whatwg-fetch';
//
//
// class CarsDbManager extends Component {
//
//     constructor() {
//         super();
//         this.state = {
//             cars: [],
//             pending: true
//         }
//     }
//
//     componentDidMount() {
//         fetch(`http://localhost:3000/cars`)
//             .then(res => res.json())
//             .then( data => {
//                 this.setState({
//                     cars: data,
//                     pending: false
//                 });
//             })
//     }
//
//     deleteCarFromList = (event, carId) => {
//         event.preventDefault();
//         fetch(`http://localhost:3000/cars` + carId, {method: 'DELETE'})
//             .then(res => res.json())
//             .then( () => {
//                 this.setState({
//                     cars: this.state.cars.filter( car => car.id !== carId ),
//                     pending: false
//                 });
//             })
//     }
//
//     render () {
//
//         if (this.state.pending) {
//             return (
//                 <p>Loading...</p>
//             )
//         }
//
//         return (
//             <div>
//                 <ul style={{width: 500}}>{this.state.cars.map( (car) =>
//                     <li key={car.id} style={{marginBottom: 20}}>
//                     {car.brand} {car.name} <button style={{float: 'right'}} onClick={(event) => this.deleteCarFromList(event, car.id)}>Sprzedany</button>
//                     </li>)}
//                 </ul>
//             </div>
//         )
//     }
// }
//
// class App extends Component {
//     render () {
//         return <CarsDbManager />
//     }
// }
//
// ReactDOM.render(
//     <App />,
//     document.getElementById("app")
// );

// =========================
// WARSZTATY
// =========================

// Cat Shelter App

// class CatShelter extends Component {
//
//     constructor() {
//         super();
//         this.state = {
//             cats: [
//                 {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
//                 {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
//                 {category: "male", age: "2", likesKids: false, name: "Grumpy"},
//                 {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
//                 {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
//                 {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
//             ]
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 <input type='text'/>
//                 <div>
//                     <input type='checkbox' />
//                     Only show cats that like kids
//                 </div>
//                 <table>
//                     <thead>
//                         <th>Name</th>
//                         <th>Age</th>
//                     </thead>
//                     <tbody>
//                         {this.state.cats.map( elem =>
//                             <tr>
//                                 <td>{elem.name}</td>
//                                 <td>{elem.age}</td>
//                             </tr>
//                         )
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }
//
// class App extends Component {
//     render () {
//         return <CatShelter />
//     }
// }
//
// ReactDOM.render(
//     <App />,
//     document.getElementById("app")
// );

// W OPARCIU O INSTRUKCJĘ

// import App from "./components/App/App";
//
// const catsData = [
//     {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
//     {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
//     {category: "male", age: "2", likesKids: false, name: "Grumpy"},
//     {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
//     {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
//     {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
// ];
//
// ReactDOM.render(
//     <App catsData={catsData}/>,
//     document.getElementById("app")
// );


// =========================
// WARSZTATY
// =========================

import App from "./components/App/App";

ReactDOM.render(
    <App />,
    document.getElementById("app")
);