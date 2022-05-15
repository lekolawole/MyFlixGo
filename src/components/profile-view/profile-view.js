import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import axios from "axios";


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.setState = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      favoriteMovies: []
    };
  }

  
  getUser(token) {
    let user = localStorage.getItem("user");
    axios.get(`https://my-flix-22.herokuapp.com/users/${user}`, {
       headers: { Authorization: `Bearer ${token}`
    }}.then(response => {
      this.setState({
        user:response.data
      })
    })
    )
  }
  render() {

    const user = localStorage.getItem("user");

  return (
    <Container>
      <Row className="justify-content-md-center">
       <Col md={3}><h1>My Account</h1></Col>
     </Row>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
            <UserInfo name={user.Username} email={ user.Email } />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <div>Hello</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* <Col>
          <FavoriteMovies favoriteMovieList={favoriteMovieList}/>
        </Col> */}
      </Row>
    </Container>
   
    )
  }
}

export default ProfileView;