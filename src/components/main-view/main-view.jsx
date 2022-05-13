import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { bool } from 'prop-types';
import './main-view.scss';

import { NavbarView } from '../navbar-view/navbar-view';
import { Redirect } from 'react-router-dom';

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

  // componentDidMount() { //loads app from server
  //   axios.get('https://my-flix-22.herokuapp.com/movies')
  //     .then(response => {
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  //Retrieves user info (if already logged in)
  componentDidMount() {
  let accessToken = localStorage.getItem('token'); //accesses user token
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')//sets user credentials for state
    });
    this.getMovies(accessToken);
  }
}

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) { //authenticates user credentials
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null
  //   });
  // }

  onRegister(isRegistered) {
    this.setState({
      isRegistered
    });
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
  

  render() {
    const { movies, selectedMovie, isRegistered, user } = this.state;
    
    
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
      <Container className="main-container container-fluid">
        
        <Router>
          <NavbarView />
      
        <div className="main-view">
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col md={3} key={m._id} style={{ "display": "flex", "marginBottom":"1.5rem"}}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/register" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              if (!user)
                return (
                  <Col lg={8} md={8}><RegistrationView /></Col>
                );
            }}
          />
            <Route path="/movies/:title" render={({ match, history }) => {
              return <Col md={10}>
                <MovieView movie={movies.find(m => m._id === match.params.title)} onBackClick={() => history.goBack()}/>
            </Col>
          }} />
            <Route path="/directors/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route exact path="/genres/name" render={({match, history}) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
              </Col>
            }}/>
            
          </Row>
        </div>
        </Router>
        
        </Container>
      );
      
  }
  
}

MainView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
}



{/*{selectedMovie
          ? (
              <Col md={10} className="main-view justify-content-md-center">
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3} style={{ "display": "flex", "marginBottom":"1.5rem"}}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/> 
              </Col>
            ))
            }     
          */}  