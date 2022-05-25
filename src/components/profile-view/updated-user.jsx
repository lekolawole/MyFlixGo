import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Control, Row, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';
import axios from "axios";

export class UpdatedUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showHide = this.showHide.bind(this);
  }

   handleChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    this.updateUser
  }

  showHide(e) {
    e.preventDefault();

    this.setState({
      collapseMenu: !this.state.collapseMenu
    });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
        let FavoriteMovies = localStorage.getItem('FavoriteMovies');
        const FavoriteMoviesObj = FavoriteMovies.split(',');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    
    axios.get(`https://my-flix-22.herokuapp.com/users/${username}`, {
       headers: { Authorization: `Bearer ${token}`
    }}).then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error)
      })
    }

//////////////////Operations to updated user info 
  updateUser = (e) => {
    e.prevent.default;
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.put(`https://my-flix-22.herokuapp.com/users/${username}`, 
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Birthday: this.state.Birthday,
        Email: this.state.Email
    },
     {
       headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });
      localStorage.setItem('user', this.state.Username);
      alert('Profile updated!');
      window.open(`users/${username}`, '_self');
    })
    .catch(function (error) {
      console.log(error)
      })
      //console.log(username);
    }

  deleteUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://my-flix-22.herokuapp.com/users/${username}`,
    {
       headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      console.log(response);
      alert('Profile deleted.');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.open('/',"_self");
    })
    .catch(function (error) {
            console.log(error);
        });
    }

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
            <Form id="example-collapse-text" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Username </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    name="Username"
                    type="text" 
                    value={this.state.Username ?? ''} 
                    placeholder= 'Enter a username' 
                    onChange={this.handleChange}
                    />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    name="Email"
                    type="text" 
                    value={this.state.Email ?? ''} 
                    placeholder= 'Enter a username' 
                    onChange={this.handleChange}
                    />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    name="Password"
                    type="text" 
                    value={this.state.Password ?? ''} 
                    placeholder= {password} 
                   onChange={this.handleChange}
                    />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday </Form.Label>
                <Form.Control 
                  style={{ "width":"24rem", "display":"flex"}}
                    type="text" 
                    name="Birthday"
                    value={this.state.Birthday ?? ''} 
                    placeholder= 'Enter a username' 
                    onChange={this.handleChange}
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