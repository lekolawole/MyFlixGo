import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

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


class MainView extends React.Component {

  constructor(){
    super();
    this.state = {// initial state for MainView
      user: null, 
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

  onLoggedIn(authData) { //authenticates user credentials
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      email: authData.user.Email,
      birthday: authData.user.Birthday,
      FavoriteMovies: authData.user.FavoriteMovies,
      password: authData.user.Password
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('password', authData.user.Password);
    localStorage.setItem('FavoriteMovies', authData.user.FavoriteMovies)
    this.getMovies(authData.token);
    const profile = document.querySelector('.nav-dropdown');
    profile.style.display = 'flex';
  }

  getMovies(token) {
  axios.get('https://my-flix-22.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.props.setMovies(response.data);
  })
  .catch(function (error) {
    console.log(error);
    });
  }

  render() {
    let { user } = this.state;
    const { movies } = this.props;
    
    // if (isRegistered) {//Creates registration Form
    //   return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />
    // }

    return (
      <Container className="main-container container-fluid">
        <Router>
          <NavbarView user={user} />
            <div className="main-view">
              <Row className="main-view justify-content-md-center">
                <Route exact path="/" render={() => {
                  if (!user) return <Col>
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>
                      if (movies.length === 0) return <div className="main-view" />;

                    return <MoviesList movies={movies}/>
                }} />
                <Route path="/register" render={() => {
                    if (user) return <Redirect to="/" />
                    return (<Col>
                      <RegistrationView />
                    </Col>
                    );
                }}/>
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
                      <ProfileView movies={movies} onBackClick={() => history.goBack()}/>
                    </Col>
                  }} />
              </Row>
            </div>
          </Router>
        </Container>
      );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView)

// MainView.propTypes = {
//   movies: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired
//   }).isRequired
// }