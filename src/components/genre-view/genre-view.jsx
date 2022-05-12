import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
  render() {
    const { genre, movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{Genre.Name}</Card.Title>
          <Card.Text>{Genre.Description}</Card.Text>
        </Card.Body>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
      </Card>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired, 
};