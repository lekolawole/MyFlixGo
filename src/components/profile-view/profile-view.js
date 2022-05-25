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
    }

//////////////////Operations to updated user info 
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
        birthday: response.data.Birthday
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

  deleteUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem.apply("token");

    axios.delete(`https://my-flix-22.herokuapp.com/users/${username}`,
    {
       headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      console.log(response);
      alert('Profile deleted.');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    })
    .catch(function (error) {
            console.log(error);
        });
    }

  setUsername(value) {
    this.setState({
      username: value
    });
  }

  setPassword(value) {
    this.setState({
      password: value
    });
  }

  setEmail(value) {
    this.setState({
      email: value
    });
  }

  setBirthday(value) {
    this.setState({
      birthday: value
    });
  }

  removeFav = (e, movie) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem.apply("token");

    axios.delete(`https://my-flix-22.herokuapp.com/users/${username}/movies/${movie._id}`, 
     {
       headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      alert('Removed from list');
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error)
      })
  }

  render() {
    const { username, email, birthday, FavoriteMovies, password } = this.state;
    const { movies } = this.props;


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
                        onChange={(e) => {this.setUsername(e.target.value)}}
                        required
                        />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value={email ?? ''} 
                        placeholder= 'Enter a username' 
                        onChange={(e) => {this.setEmail(e.target.value)}}
                        required
                        />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value= {password ?? '' }
                        placeholder= 'Enter new password' 
                        onChange={(e) => {this.setPassword(e.target.value)}}
                        required
                        />
                  </Form.Group>

                  {/* <Form.Group>
                    <Form.Label>Birthday </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="date" 
                        value= '' 
                        placeholder= 'yyyy-mm-dd'
                        onChange={(e) => {this.setBirthday(e.target.value)}}
                        required
                        />
                  </Form.Group> */}
                <Button 
                  type="submit"
                  variant="outline-success"
                  onClick={this.updateUser}
                  style={{"marginTop":"2rem"}}
                  >Save Changes</Button>
                <Button
                  variant="outline-danger"
                  onClick={this.deleteUser}
                  style={{"marginLeft":"4rem", "marginTop":"2rem"}}
                >Delete Account</Button>
              </Form>
            </Card.Body>
          </Card>   
        </Col>
      </Row>
      <Row className="favorites-container">
        <Col md={12}><h1>My List</h1></Col>
        {
        FavoriteMovies.length > 0 && 
        movies.map((movie) => {if (movie._id === FavoriteMovies.find((fav)=> fav === movie._id)) {return ( 
                        <Col md={4} key={movie._id}>
                            <Card className="favorite-movie">
                                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" alt="Movie Image" />
                                <Card.Body>
                                    <Card.Title className="movie-title">{movie.Title}</Card.Title>
                                    <Button value={movie._id} variant="outline-danger" onClick={(e) => this.removeFav(e, movie)}></Button> 
                                </Card.Body>
                            </Card>
                        </Col>
                        );
                    }})}
      </Row>
    </Container>
    )
  }
}

export default ProfileView;

ProfileView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        MovieDirector: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired
};
