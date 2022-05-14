import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  //Declare hooks for validation
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthdayErr, setBirthdayErr ] = useState('');

  //Function that returns where validation requirements (isReq) are T/F
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
    }else if(password.length < 8){
      setPasswordErr('Password must be 8 characters long');
      isReq = false;
    }
    if(!email){
      setEmailErr('Email is Required');
      isReq = false;
    }else if(email.indexOf('@') === -1) {
      setEmailErr('Must be a valid email address');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if(isReq){
        axios.post('https://my-flix-22.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        console.log(response.data);
        alert('Registration successful, please login!');
        window.open('/',"_self");
      })
      .catch(e => {
        console.log('Error during registration.');
        alert('Registration not complete')
      });
    }
    
    console.log(username, password, email, birthday);
    props.onRegister(false)
  };


  return(
    <Container style={{"marginTop":"5rem"}}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <CardGroup>
            <Card>
              <Card.Body>
              <Card.Title>Registering for a free account is easy!</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>
                  Username:
                  <Form.Control 
                    style={{ "width":"24rem", "display":"flex"}}
                    type="text" 
                    value={username} 
                    placeholder= 'Enter a username' 
                    onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Label>
                </Form.Group>

                <Form.Group>  
                  <Form.Label>
                    Password:
                    <Form.Control
                      style={{ "width":"24rem", "display":"flex"}}
                      type="password" 
                      value={password} 
                      minLength="8"
                      placeholder= 'Your password must be 8 or more characters' 
                      onChange={e => setPassword(e.target.value)} />
                      {passwordErr && <p>{passwordErr}</p>}
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email: 
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                      type="email" 
                      value={email} 
                      placeholder='Enter your email address' 
                      onChange={e => setEmail(e.target.value)} />
                      {emailErr && <p>{emailErr}</p>}
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
                    {birthdayErr && <p>{birthdayErr}</p>}
                  </Form.Label>
                </Form.Group>

                <Button type="submit" onClick={handleSubmit}>Register</Button>
              </Form>
              <div>
                <a href='/'>
                  <p style={{"marginTop":"1rem"}}>I already have an account</p>
                </a>
              </div>
              
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