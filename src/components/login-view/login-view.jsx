import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row, Container, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  //Declare hooks for inputs
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  //Form validation
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username is Required');
      isReq = false;
    }else if(username.length < 2){
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password is Reaquired');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
  if(isReq) {
    /* Send a request to the server for authentication */
  axios.post('https://my-flix-22.herokuapp.com/login', {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user')
  });
  }
  
};

  return (
    <Container className="main-container login" style={{"marginTop":"10rem"}}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <div style={{"margin":"1.2, 0, 0, 2rem"}}>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                <Link to="/register">
                  <Button style={{"marginLeft":"4rem"}} variant="secondary" type="submit">New User? Register here</Button>
                </Link>
              </div>
            </Form>
           </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}