import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';

import { bool } from 'prop-types';
import './main-view.scss';

import { NavbarView } from '../navbar-view/navbar-view';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {// initial state for MainView
      movies: [], // constructs array of movies from API
      directors: [],
      genres: [],
      //selectedMovie: null,
      //isRegistered: null,
      user: null
    };
  }

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
    // console.log(authData);
    this.setState({
      user: authData.user.Username,
      email: authData.user.Email
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // onRegister(isRegistered) {
  //   this.setState({
  //     isRegistered
  //   });
  // }

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

    return (
      <Container className="main-container container-fluid">
        
        <Router>
          <NavbarView />
      
            <div className="main-view">
              <Row className="main-view justify-content-md-center">
                <Route exact path="/" render={() => {
                  if (!user) { //if user is not already logged in
                    return (<Col>
                        <LoginView 
                      onLoggedIn={user => this.onLoggedIn(user)} 
                      // onRegister={(bool) => this.onRegister(bool)}
                      />
                      </Col>
                    );
                    if (movies.length === 0) return <div className="main-view" />;
                    //User details passed as props if there is a user; if no user, LoginView is rendered
                    }
          
                  return movies.map(m => (
                    <Col md={3} key={m._id} style={{ "display": "flex", "marginBottom":"1.5rem"}}>
                      <MovieCard movie={m} />
                    </Col>
                  ))
                }} />
                <Route path="/register" render={() => {
                    if (user) return <Redirect to="/" />
                    return (<Col>
                      <RegistrationView />
                    </Col>
                    );
                }}
              />
                <Route path="/movies/:movieId" render={({ match, history }) => {
                  if (!user) {
                    return (<Col>
                        <LoginView 
                      onLoggedIn={user => this.onLoggedIn(user)} 
                      />
                      </Col>
                    );}
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={10}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
                </Col>
              }} />
                <Route path="/directors/:name" render={({ match, history }) => {
                  if (!user) { 
                    return (<Col>
                        <LoginView 
                      onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>
                    );}
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                    <DirectorView director={movies.find(m => m.MovieDirector.Name === match.params.name).MovieDirector} onBackClick={() => history.goBack()} />
                  </Col>
                }} />
                <Route path="/genres/:name" render={({match, history}) => {
                  if (!user) { 
                    return (<Col>
                        <LoginView 
                      onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>
                    );}
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
                  </Col>
                }}/>
                <Route path={`/users/${user}`} render={(
                  {history}) => {
                    if (!user) return <Redirect to="/" />
                    return <Col>
                      <ProfileView user={user} onBackClick={() => history.goBack()}/>
                    </Col>
                  }} />
                
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