import React from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

function FavMoviesView({ movieData }) {
  const user = localStorage.getItem('user');
  const FavoriteMovies = localStorage.getItem('FavoriteMovies');
  
  return ( 
    <Container>
      <Row>
        <Col>
          <h1>Favorite Movies</h1>
          {/* <div>{moviesList}</div> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <div key={user}>{user}</div>
        {/* <div key={FavMovieInfo}>{FavMovieInfo}</div> */}
          <div key={FavoriteMovies}>Favorite Movie (ID): {FavoriteMovies}</div>
        </Col>
      </Row>
    </Container>
  )
}

export default FavMoviesView;