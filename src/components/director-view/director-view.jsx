import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {
  render() {
    const { director, movie, onBackClick } = this.props;

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <div className="director-name">
              <span className="label">  
                <h1 className="value">{director.Name}</h1>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="director-description">
              <span className="value">{director.Bio}</span>
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired, 
  onBackClick: PropTypes.func.isRequired
};