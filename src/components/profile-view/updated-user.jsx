import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Control, Row, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';
import axios from "axios";

export class UpdatedUser extends React.Component {

    //const [open, setOpen] = useState(false);
  constructor(props){
    super(props);
    this.state = {
      collaspeMenu: true,
    };
    this.showHide = this.showHide.bind(this);
  }

  showHide(e) {
    e.preventDefault();

    this.setState({
      collapseMenu: !this.state.collapseMenu
    });
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    
    
    axios.get(`https://my-flix-22.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        user: response.data.Username,
        email: response.data.Email, 
        password: response.data.Password,
        birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch((e) => 
      console.log(e))
  }

  
  updateUser = (e) => {
    //e.preventDefault();
   
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

    if(isReq){
        axios.post(`https://my-flix-22.herokuapp.com/users/{user}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        console.log(response.data);
        alert('Profile changes were saved!');
      })
      .catch(e => {
        console.log('Error during update.');
        alert('Changes not saved')
      });
    }
    console.log(username, password, email, birthday);
  };

  //Testing handle Submit button
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const isReq = validate();

  //   if(isReq){
  //       axios.post('https://my-flix-22.herokuapp.com/users', {
  //       Username: username,
  //       Password: password,
  //       Email: email,
  //       Birthday: birthday
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       alert('Registration successful, please login!');
  //       window.open('/',"_self");
  //     })
  //     .catch(e => {
  //       console.log('Error during registration.');
  //       alert('Registration not complete')
  //     });
  //   }
    
  //   console.log(username, password, email, birthday);
  //   props.onRegister(false)
  // };

  render() {
    const user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    let birthday = localStorage.getItem("birthday");
    let password = localStorage.getItem("password");
  
  return (
   <Container>
     <Row>
       <Col>
        <Button
            onClick={this.showHide}
            aria-controls="example-collapse-text"
            role="button"
            aria-expanded="false">
            Click to Manage Profile
        </Button>

        <Collapse in={!this.state.collapseMenu}>
            <Form id="example-collapse-text">
              <Form.Group>
                <Form.Label>Username </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    type="text" 
                    value={user} 
                    placeholder= 'Enter a username' 
                    onChange={(e) => {this.updateUser()}}
                    />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    type="text" 
                    value={email} 
                    placeholder= 'Enter a username' 
                    onChange={(e) => {this.updateUser()}}
                    />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    type="text" 
                    value={password} 
                    placeholder= {password} 
                    onChange={(e) => {this.updateUser()}}
                    />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    type="text" 
                    value={birthday} 
                    placeholder= 'Enter a username' 
                    onChange={(e) => {this.updateUser()}}
                    />
              </Form.Group>
            <Button 
              type="submit"
              //onClick={this.handleSubmit()}
              >Save Changes</Button>
          </Form>
        </Collapse>
       </Col>
     </Row>
   </Container>
  )
  }
}

export default UpdatedUser;

// UserInfo.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired
//   }).isRequired
// }