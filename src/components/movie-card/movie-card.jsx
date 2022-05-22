import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      movies: [],
      FavoriteMovies: []
    };
  }
  
  ///////////////////TESTING ADD MOVIE IN CONSOLE
  addFavMovie(movie) {
      const { user, token } = this.props;
      const { FavoriteMovies } = this.state;
      
      const { id } = movie._id;
      // const token = localStorage.getItem('token');
      // const user = localStorage.getItem('user');

     
        console.log(`${movie.Title} has been added.`);

        const newFavoritesList = [...FavoriteMovies, movie];
        this.setState({
        FavoriteMovies: newFavoritesList,
        })
      
    // axios.post(`/users/${user}/movies/${movie._id}`, {}, {
    //   headers: { Authorization: `Bearer ${token}`}
    // })
    // .then(response => {
    //   // Assign the result to the state
    //   this.setState({
    //     FavoriteMovies: response.data.FavoriteMovies
    //   });
    //   // const updatedUser = {
    //   //   ...user, FavoriteMovies: user.FavoriteMovies.push(movie._id)
    //   // }; 
    //   alert(`${movie.Title} was added to your Favorites.`);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    console.log(FavoriteMovies)
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
          onClick={() => { this.addFavMovie(movie) }}
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