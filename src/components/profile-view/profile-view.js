import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import UserInfo from "./user-info";
import UpdatedUser from "./updated-user";
import FavoriteMovies from "./favorite-movies";
import axios from "axios";
import PropTypes from 'prop-types';
import FavMoviesView from "./fav-movies";


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.setState = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      FavoriteMovies: []
    };
  }

  
  getUser(token) {
    let user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    let birthday = localStorage.getItem("birthday");
    let password = localStorage.getItem("password");
    
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
    let email = localStorage.getItem("email");
    let birthday = localStorage.getItem("birthday");
    let password = localStorage.getItem("password");
    let FavoriteMovies = localStorage.getItem('FavoriteMovies');

  return (
    <Container>
      <Row className="justify-content-md-center">
       <Col md={3}><h1>My Account</h1></Col>
     </Row>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
            <UserInfo name={user.Username} email={ user.Email } birthday={user.Birthday} password={user.Password} FavoriteMovies={user.FavoriteMovies}/>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdatedUser />
              {/* <UpdateUser /> */}
            </Card.Body>
          </Card>   
        </Col>
        {/* <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <div>Hello</div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      <Row>
        <Col>
          <FavMoviesView />
          {/* <FavoriteMovies favoriteMovieList={user.FavoriteMovies}/> */}
        </Col>
      </Row>
    </Container>
   
    )
  }
}

export default ProfileView;

// ProfileView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     FavoriteMovies: PropTypes.array.isRequired
//   }).isRequired
// }