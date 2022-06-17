import React from 'react';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class RecommendedMovies extends React.Component {

  render() {
    const { selectedMovie, movies } = this.props;

    return (
      <Container>
      <Row>
        <h3>You Might Like...</h3>
        <Col         >
          <div className='recommended-movies' style={{"overflowX":"scroll", "display":"flex"}}>
            {
            movies.map((movie) => {
               {return (
              <Col Col md={3} key={movie._id}>
                <Card className="favorite-movie" style={{"marginTop":"2rem"}}>
                  <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" alt="Movie Image" />
                  <Card.Body>
                    <Card.Title style={{"fontSize":"12px"}}>{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="link" onClick={() => {}}>Open</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>)}})};
          </div>
        </Col>
      </Row> 
    </Container>
    );
  }
}


{/* <Container>
      <Row>
        <h3>You Might Like...</h3>
        <Col         >
          <div className='recommended-movies' style={{"overflowX":"scroll", "display":"flex"}}>
            {

            movies.map((movie) => ( 
              <Col Col md={3} key={movie._id}>
                <Card className="favorite-movie" style={{"marginTop":"2rem"}}>
                  <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" alt="Movie Image" />
                  <Card.Body>
                    <Card.Title style={{"fontSize":"12px"}}>{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="link" onClick={() => {}}>Open</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>))};
          </div>
        </Col>
      </Row> 
    </Container>*/}