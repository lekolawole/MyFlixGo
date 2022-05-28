import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';


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
  const isReq = validate(); //remember to call/declare variable since it's out of scope
  if(isReq) {
    /* Send a request to the server for authentication */
  axios.post('https://my-flix-22.herokuapp.com/login', {
    Username: username,
    Password: password
  })
  .then(response => {
    const { data } = response;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user);
    props.setUser(data.token, data.user);
    props.onLoggedIn(data);
    console.log(store.getState());
    //console.log(data);
  })
  .catch(e => {
    console.log('no such user')
  });
  }
  
};

  // const handleRegister = (e) => {
  //   props.onRegister(true)
  // }

  return (
    <Container className="main-container" style={{"marginTop":"10rem"}}>
      <Row className="justify-content-md-center">
        <Col md={6}>
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
        </Col>
      </Row>
    </Container>
  );
}


LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired
}