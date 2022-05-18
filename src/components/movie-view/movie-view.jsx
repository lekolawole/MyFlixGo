import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FavoriteMovies: false
    };
  }


  componentDidMount() {
    const { movie } = this.props;
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(user);
    //console.log(movie._id);
    console.log(movie);
    console.log(token);
    let movieData = localStorage.setItem(token, movie);
    // this.setState = {
    //   Favorite: user.FavoriteMovies
    // }
  }

  addRemoveFavMovie() {
      const { movie } = this.props;
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

    axios.post(`/users/${user}/movies/${movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        FavoriteMovies: true
      });
      user.FavoriteMovies.push(movie._id);
      alert(`${movie.Title} was added to your Favorites.`)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movie, onBackClick, addRemoveFavMovie } = this.props;
    let user = localStorage.getItem('user');

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
              <Button variant="secondary" className="favorite-button" onClick={() => 
              
              //{console.log(movie._id); console.log(user)}} testing
                { this.addRemoveFavMovie() }}
                >+</Button>
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
    MovieDirector: PropTypes.object.isRequired,
    Rating: PropTypes.string.isRequired
  }).isRequired,
  // user: PropTypes.shape({
  //   username: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired,
  // }).isRequired
  // Director: PropTypes.shape({
  //   Name: PropTypes.string.isRequired
  // }).isRequired,
};