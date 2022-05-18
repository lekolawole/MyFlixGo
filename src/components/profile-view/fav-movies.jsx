import React from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';

function FavMoviesView() {
  const user = localStorage.getItem('user');
  const FavoriteMovies = localStorage.getItem('FavoriteMovies');

  let FavoriteMoviesList = [
    {Title: "The Batman",
      Year: "2022",
      ImagePath: "#"},
    {
      Title: "The Last Samurai",
      Year: "1999",
      ImagePath:"#"
    },
    {
      Title: "The Little Mermaid",
      Year: "1996",
      ImagePath: "#"
    }
  ]

  let FavMovieInfo = FavoriteMoviesList.map(function(element) {
    return <div>{element.Title} {element.Year}</div>
  })

  return ( 
    <Container>
      <Row>
        <Col>
          <h1>Favorite Movies</h1>
        </Col>
      </Row>
      <Row>
        <div>{user}</div>
        <div>{FavMovieInfo}</div>
      </Row>
      
    </Container>
  )
}

export default FavMoviesView;