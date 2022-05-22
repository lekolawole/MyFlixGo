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
      user: '',
      movies: [],
      FavoriteMovies: []
    };
  }


  componentDidMount() {
    const { movie, user, token, FavoriteMovies } = this.props;
    console.log(FavoriteMovies)
    //const user = localStorage.getItem('user');
    //const token = localStorage.getItem('token');
    // console.log(user);
    //console.log(movie._id);
    //console.log(movie);
    // console.log(token);
    //let movieData = localStorage.setItem(token, movie);
    // this.setState = {
    //   FavoriteMovies: user.FavoriteMovies
    // }
  }

  // onLoggedIn(authData) { //authenticates user credentials
  //   // console.log(authData);
  //   this.setState({
  //     user: authData.user.Username,
  //     email: authData.user.Email,
  //     birthday: authData.user.Birthday,
  //     FavoriteMovies: authData.user.FavoriteMovies,
  //     password: authData.user.Password
  //   });

  //   localStorage.setItem('token', authData.token);
  //   localStorage.setItem('user', authData.user.Username);
  //   localStorage.setItem('email', authData.user.Email);
  //   localStorage.setItem('birthday', authData.user.Birthday);
  //   localStorage.setItem('password', authData.user.Password);
  //   //localStorage.setItem('FavoriteMovies', authData.user.FavoriteMovies)
  //   this.getMovies(authData.token);
  // }

  addFavMovie(movie) {
      const { user, token } = this.props;
      const { FavoriteMovies } = this.state;
      const { id } = movie._id;
      // const token = localStorage.getItem('token');
      // const user = localStorage.getItem('user');

     
        alert(`${movie.Title} has been added.`);

        const newFavoritesList = [...FavoriteMovies, movie];
        this.setState({
        FavoriteMovies: newFavoritesList,
        })
      
    axios.post(`/users/${user}/movies/${movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        FavoriteMovies: response.data.FavoriteMovies
      });
      // const updatedUser = {
      //   ...user, FavoriteMovies: user.FavoriteMovies.push(movie._id)
      // }; 
      alert(`${movie.Title} was added to your Favorites.`);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(FavoriteMovies)
  }

  render() {
    const { movie, onBackClick, addRemoveFavMovie } = this.props;
    const { FavoriteMovies } = this.state; 

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
                { this.addFavMovie(movie) }}
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