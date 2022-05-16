import React from "react";
import { Button, Card, Col, Container, Form, Control, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';

export class UserInfo extends React.Component {
   getUser(token) {
    let user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    
    axios.get(`https://my-flix-22.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        user: response.data.Username,
        email: response.data.Email
      });
    })
    .catch((e) => 
      console.log(e))
  }
  
  render() {
    const user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    
    

  
  return (
   <Container>
     <Row className="user-row">
       <Col>
        <div className="user-col-left info">Name: {user}</div>
        <div className="info">e-mail: {email}</div>
       </Col>
     </Row>
   </Container>
  )
  }
  
}

export default UserInfo;

// UserInfo.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired
//   }).isRequired
// }