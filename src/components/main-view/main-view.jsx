import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';

import './main-view.scss';

import { NavbarView } from '../navbar-view/navbar-view';

class MainView extends React.Component {

  componentDidMount() {
  let accessToken = localStorage.getItem('token'); //accesses user token
  
  if (accessToken !== null) {
    const { setUser } = this.props;
    setUser(localStorage.getItem('user'));
    this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) { //authenticates user credentials
    const { setUser } = this.props;   

    setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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
    //let { user } = this.state;
    const { movies, user } = this.props;

    return (
      <Container className="main-container view">
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
                    if (user) return <Redirect to="/register" />
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
                  return <Col md={12}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} movies={movies} onBackClick={() => history.goBack()}/>
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
                <Route exact path={`/users/${user}`} render={(
                  { match, history }) => {
                    if (!user) return 
                    return <Col>
                      <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()}/>
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
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView)
