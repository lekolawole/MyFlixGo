import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { AddFavMovie } from './addFavMovie';
import { Link } from 'react-router-dom';
import { RecommendedMovies } from './RecommendedMovies';

import './movie-view.scss';

export class MovieView extends React.Component {

  findMovies(_id) {

  }

  addFavM(movie) {   
    let user = localStorage.getItem('user');
    const newUser = [...user];
    setUser(newUser); 
    console.log(user);
  }

  render() {
    const { movie, movies, onBackClick, user, FavoriteMovies, token } = this.props;

    return (
      <Container className="movie-view-container">
        <Row className="movie-view">
          <Col md={2} className="movie-poster">
            <img src={movie.ImagePath} />
          </Col>
          <Col md={8}>
            <div md={2} className="movie-title">
              <span className="value">{movie.Title}</span>
              <AddFavMovie movie={movie} user={user} FavoriteMovies={FavoriteMovies} token={token}/>
            </div>
              
            <div className="movie-rating">
              <span className="label">Rating: </span>
              <span className="value">{movie.Rating * 10}%</span>
              <div style={{"display":"inline-block", "marginLeft":"10%"}}>{movie.ReleaseYear}</div>
            </div>
            <div className="movie-description">
              <span className="value">{movie.Description}</span>
            </div>
          <Link to={`/directors/${movie.MovieDirector.Name}`}>
                <Button variant="link">{movie.MovieDirector.Name}</Button>
              </Link>

              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
          </Col>
          <Col>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
      </Row>
      <Row>
        <Col>
          <RecommendedMovies selectedMovie={movie} movies={movies} />
        </Col>
      </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Rating: PropTypes.string.isRequired
  }).isRequired
};