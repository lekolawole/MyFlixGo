import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { bool } from 'prop-types';
import './main-view.scss';
//import { NavbarView } from '../navbar-view/navbar-view';

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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

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
        <Nav className="main-view-nav">
          <Nav.Item>
            <img className="main-logo" src='https://github.com/lekolawole/public/blob/main/logo2.png?raw=true'></img>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Movies</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Profile">
            <NavDropdown.Item>
              <Nav.Link onClick={() => {this.onLoggedOut()}}>Logout</Nav.Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      
        <Row>
        {selectedMovie
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
          </Row>
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