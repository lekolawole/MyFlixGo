import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { bool } from 'prop-types';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {// initial state for MainView
      movies: [], // constructs array of movies from API
      selectedMovie: null,
      isRegistered: null,
      user: null
    };
  }

   //loads app from server
  componentDidMount() {
         let accessToken = localStorage.getItem('token');
         if (accessToken !== null) {
             this.setState({
                 user: localStorage.getItem('user')
             });
             this.getMovies(accessToken);
         }
        
  }
  
  getMovies(token) {
   axios.get('https://my-flix-22.herokuapp.com/movies', {
     headers: { Authorization: `Bearer ${token}`}
   })
   .then(response => {
     // Assign the result to the state
     this.setState({
       movies: response.data
     });
   })
   .catch(function (error) {
     console.log(error);
   });
 }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // onLoggedIn(user) {
  //   this.setState({
  //     user
  //   });
  // }

  onLoggedIn(authData) {
     console.log(authData);
     this.setState({
       user: authData.user.Username,
       FavoriteMovies: authData.user.FavoriteMovies
     });

     localStorage.setItem('token', authData.token);
     localStorage.setItem('user', authData.user.Username);
     this.getMovies(authData.token);
   }

  onRegister(isRegistered) {
    this.setState({
      isRegistered
    });
  }

  render() {
    const { movies, selectedMovie, isRegistered, user, FavoriteMovies } = this.state;
    
    if (isRegistered) {//Creates registration Form
      return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />
    }
    

    if (!user) { //if user is not already logged in
      return (
        <LoginView 
        onLoggedIn={user => this.onLoggedIn(user)} 
        onRegister={(bool) => this.onRegister(bool)}
        />
      );
      //User details passed as props if there is a user; if no user, LoginView is rendered
    }
      

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row>
      {selectedMovie
        ? (
            <Col md={10} className="main-view justify-content-md-center">
              <MovieView movie={selectedMovie} FavoriteMovies={FavoriteMovies} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3} style={{ "display": "flex", "marginBottom":"1.5rem"}}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/> 
            </Col>
          ))
          }           
        </Row>
      );
  }
  
}

MainView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
}