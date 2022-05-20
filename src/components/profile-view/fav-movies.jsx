import React from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import './profile-view.scss';

function FavMoviesView({ movieData }) {
  const user = localStorage.getItem('user');
  const FavoriteMovies = localStorage.getItem('FavoriteMovies');
  
  return ( FavoriteMovies.map((movies) => {
       <div key={movies._id}>
            <img src={movies.ImagePath} />
          <div key={movie._id}>
            <img src={movie.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
              <h4>{movie.Title}</h4>
            </Link>
          </div>
        </div>
        }
      )
    // <Container>
    //   <Row>
    //     <Col>
    //       <h1>Favorite Movies</h1>
    //       {/* <div>{moviesList}</div> */}
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col>
    //       <div key={user}>{user}</div>
    //       <div key={FavMoviesList}>{FavMoviesList}</div>
    //       <div key={FavoriteMovies}>Favorite Movie (ID): {FavoriteMovies}</div>
    //     </Col>
    //   </Row>
    // </Container>
  )
}

export default FavMoviesView;