import React from "react";
import { Button, Container, Row, Col, Card, Form, Collapse } from 'react-bootstrap';
// import UserInfo from "./user-info";
// import UpdatedUser from "./updated-user";
import axios from "axios";
import PropTypes from 'prop-types';
import FavMoviesView from "./fav-movies";


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    //const email = localStorage.getItem("email");
    
    axios.get(`https://my-flix-22.herokuapp.com/users/${username}`, {
       headers: { Authorization: `Bearer ${token}`
    }}).then(response => {
      this.setState({
        username: response.data.Username,
        password: response.data.Password,
        email: response.data.Email,
        birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error)
      })
      console.log(username);
      //console.log(birthday)
      //console.log(typeof(username))
    }
  
  convertMoviesString() {
    const FavoriteMoviesObj = FavoriteMovies.split(',');
    const newMoviesObj = FavoriteMoviesObj.map((item) => {
      return {
        _id: item
      }
    });
    const moviesArr = Object.entries(newMoviesObj).map(entry => entry[1]
    );
    console.log(moviesArr);

    this.setState({
      FavoriteMovies: moviesArr
    })
    console.log(FavoriteMovies)
  }

  updateUser = (e) => {
    e.prevent.default;
    const username = localStorage.getItem("user");
    const token = localStorage.getItem.apply("token");

    axios.put(`https://my-flix-22.herokuapp.com/users/${username}`, 
      {
        username: this.state.Username,
        password: this.state.Password,
        birthday: this.state.Birthday,
        email: this.state.Email
    },
     {
       headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        username: response.data.Username,
        password: response.data.Password,
        email: response.data.Email,
        birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
      localStorage.setItem('user', this.state.username);
      alert('Profile updated!');
      window.open(`users/${user}`, '_self');
    })
    .catch(function (error) {
      console.log(error)
      })
      console.log(username);
    }
  render() {
    const { username, email, birthday, FavoriteMovies, password } = this.state;
    const { moviesArr, movies } = this.props;
    // const user = localStorage.getItem("user");
    // let email = localStorage.getItem("email");
    // let birthday = localStorage.getItem("birthday");
    // let password = localStorage.getItem("password");
    // let FavoriteMovies = localStorage.getItem('FavoriteMovies');

  return (
    <Container>
      <Row className="justify-content-md-center">
       <Col md={3}><h1>My Account</h1></Col>
      </Row>
      <Row>
        <Col xs={12} sm={4}>
          <Card className="user-info">
            <Card.Body>
              <Card.Title>My Account Details</Card.Title>
              <Card.Text>Name: {username}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>Birthday: {birthday}</Card.Text>
              {/* <UserInfo name={user.Username} email={ user.Email } birthday={user.Birthday} password={user.Password} FavoriteMovies={user.FavoriteMovies}/> */}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
                <Form id="example-collapse-text" onSubmit={(e) => this.updateUser( e, this.username, this.password, this.email, this.birthday )}>
                  <Form.Group>
                    <Form.Label>Username </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value={username ?? ''} 
                        placeholder= 'Enter a username' 
                        onChange={(e) => {this.updateUser()}}
                        />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value={email ?? ''} 
                        placeholder= 'Enter a username' 
                        onChange={(e) => {this.updateUser()}}
                        />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value='' 
                        placeholder= 'Enter new password' 
                        onChange={(e) => {this.updateUser()}}
                        />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value={birthday ?? ''} 
                        placeholder= 'Enter a username' 
                        onChange={(e) => {this.updateUser()}}
                        />
                  </Form.Group>
                <Button 
                  type="submit"
                  //onClick={this.handleSubmit()}
                  >Save Changes</Button>
              </Form>
              {/* <UpdatedUser user={user} /> */}
            </Card.Body>
          </Card>   
        </Col>
      </Row>
      <Row className="favorites-container">
        <Col>
          {moviesArr}
          {/* <FavMoviesView /> */}
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