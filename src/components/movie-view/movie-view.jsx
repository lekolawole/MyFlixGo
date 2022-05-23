import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { AddFavMovie } from './AddFavMovie';
import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick, user, FavoriteMovies, token } = this.props;

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
              <span className="value">{movie.Rating}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
          </Col>
          <Col>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
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
    //MovieDirector: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired
  }).isRequired
};