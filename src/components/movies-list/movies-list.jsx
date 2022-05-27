import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visbilityFilter } = state;
  return { visbilityFilter };
}

function MoviesList(props) {
  const { movies, visbilityFilter } = props;
  let filteredMovies = movies; 

  if (visbilityFilter !== '') {
    filteredMovies = movies.filter(m=> m.Title.toLowerCase().includes(visbilityFilter.toLowerCase()))
  };

  
  if (!movies) return <div className="main-view"/>

  return (
    <Container>
    <Row>
      <Col md={12}>
        <VisibilityFilterInput visbilityFilter={visbilityFilter} />
      </Col>
    </Row>

    <Row className="movie-scroll" style={{"overflow-x":"auto", "flex-wrap":"nowrap"}}>
      {filteredMovies.map(m => (
      <Col className="movie-card" md={4} key={m._id} style={{ "display": "flex", "marginBottom":"1rem"}}>
        <MovieCard movie={m}/>
      </Col>
      ))}
    </Row>
  </Container>
  )
  
}

export default connect(mapStateToProps)(MoviesList);