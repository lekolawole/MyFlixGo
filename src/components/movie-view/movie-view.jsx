import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row className="movie-view">
          <Col md={3} className="movie-poster">
            <img src={movie.ImagePath} />
          </Col>
          <Col md={9}>
            <div md={2} className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
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
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
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
    Director: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired
  }).isRequired
};