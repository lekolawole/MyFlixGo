import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  
  render() {
    const { movie, onBackClick } = this.props;

  

    return (
      <Container className="movie-view-container">
        <Row className="movie-view">
          <Col md={2} className="movie-poster">
            <img src={movie.ImagePath} />
          </Col>
          <Col md={8}>
            <div md={2} className="movie-title">
              <span className="label"></span>
              <span className="value">{movie.Title}</span>
              <Button variant="secondary" className="favorite-button">+</Button>
            </div>
            <div className="movie-rating">
              <span className="label">Rating: </span>
              <span className="value">{movie.Rating * 10}%</span>
              {/* <span className="label">Release Year: </span> */}
              <div style={{"display":"inline-block", "marginLeft":"10%"}}>{movie.ReleaseYear}</div>
            </div>
            <div className="movie-description">
              <span className="value">{movie.Description}</span>
            </div>
            <div>
              <Link to={`/directors/${movie.MovieDirector.Name}`}>
                <Button variant="link">{movie.MovieDirector.Name}</Button>
              </Link>

              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <div>
              
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
    MovieDirector: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired
  }).isRequired,
  // Director: PropTypes.shape({
  //   Name: PropTypes.string.isRequired
  // }).isRequired,

};