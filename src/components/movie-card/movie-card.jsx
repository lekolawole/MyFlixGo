import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieCard extends React.Component {
  addRemoveFavMovie() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const movie = this.movie;

    axios.post(`/users/${user}/movies/${movie}`, {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      FavoriteMovies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  render() {
    const { movie, user } = this.props;
    
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button 
              variant="link" 
              onClick={() => {
              //console.log(movie._id);
            }}>Open</Button>
          </Link>
          <Button 
            variant="secondary" 
            className="favorite-button" 
          //onClick={() => { this.addRemoveFavMovie(user, movie) }}
          >+</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired,
  }).isRequired, 
};