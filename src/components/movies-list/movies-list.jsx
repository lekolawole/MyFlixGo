import React from 'react';
import Col from 'react-bootstrap/Col';
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
    <>
    <Col md={12} style={{ "margin":"1rem" }}>
      <VisibilityFilterInput visbilityFilter={visbilityFilter} />
    </Col>
    {filteredMovies.map(m => (
    <Col md={3} key={m._id} style={{ "display": "flex", "marginBottom":"1.5rem"}}>
      <MovieCard movie={m}/>
    </Col>
    ))}
  </>
  )
  
}

export default connect(mapStateToProps)(MoviesList);