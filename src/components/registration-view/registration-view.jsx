import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, Container, Row, Col, CardGroup } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('https://my-flix-22.herokuapp.com/users', {
    //   Username: username,
    //   Password: password,
    //   Email: email,
    //   Birthday: birthday
    // })
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch(e => {
    //   console.log('Error during registration.');
    //   alert('Registration not complete')
    // });
    console.log(username, password, email, birthday);
    props.onRegister(false)
  }

  return(
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
              <Card.Title>Registering for a free account is easy!</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>
                  Username:
                  <Form.Control 
                    type="text" 
                    value={username} 
                    placeholder= 'Enter a username' 
                    onChange={e => setUsername(e.target.value)} />
                  </Form.Label>
                </Form.Group>

                <Form.Group>  
                  <Form.Label>
                    Password:
                    <Form.Control
                      type="password" 
                      value={password} 
                      minLength="8"
                      placeholder= 'Your password must be 8 or more characters' 
                      onChange={e => setPassword(e.target.value)} />
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email: 
                    <Form.Control 
                      type="email" 
                      value={email} 
                      placeholder='Enter your email address' 
                      onChange={e => setEmail(e.target.value)} />
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                  Birthday: 
                    <Form.Control 
                    type="date" 
                    value={birthday} 
                    placeholder='mm/dd/yyyy' 
                    onChange={e => setBirthday(e.target.value)} />
                  </Form.Label>
                </Form.Group>

                <Button type="submit" onClick={handleSubmit}>Register</Button>
              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    
  );
}

// RegistrationView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired
//   }).isRequired
// }