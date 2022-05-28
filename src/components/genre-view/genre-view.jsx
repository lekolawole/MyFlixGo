import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class GenreView extends React.Component {
  render() {
    const { genre, movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className="genre-name">
              <span className="label">  
                <h1 className="value">{genre.Name}</h1>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="genre-description">
              <span className="value">{genre.Description}</span>
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

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired, 
  onBackClick: PropTypes.func.isRequired
};