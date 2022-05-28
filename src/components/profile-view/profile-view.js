import React from "react";
import { Button, Container, Row, Col, Card, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import PropTypes from 'prop-types';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    // const { setUser } = this.props;   
    // setUser(user.Username);

    // let FavoriteMovies = localStorage.getItem('FavoriteMovies');
    // const FavoriteMoviesObj = FavoriteMovies.split(',');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    
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
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    e.preventDefault();

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
      localStorage.setItem("user", this.state.Username);
      console.log(response.data.Username);
      alert('Profile updated!');
      window.open(`/users/${response.data.Username}`, '_self');
    })
    .catch(function (error) {
      console.log(error)
      })
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

  setUsername(value) {
    this.setState({
      Username: value
    });
  }

  setPassword(value) {
    this.setState({
      Password: value
    });
  }

  setEmail(value) {
    this.setState({
      Email: value
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value
    });
  }

  removeFav = (e, movie) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://my-flix-22.herokuapp.com/users/${username}/movies/${movie._id}`, 
     {
       headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //alert('Removed from list');
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error)
      })
  }

  render() {
    const { Username, Email, Birthday, FavoriteMovies, Password } = this.state;
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
              <Card.Text>Name: {Username}</Card.Text>
              <Card.Text>Email: {Email}</Card.Text>
              <Card.Text>Birthday: {Birthday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card style={{"marginLeft":"5rem"}}>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
                <Form id="example-collapse-text" 
                onSubmit={(e) => this.updateUser( e, this.Username, this.Password, this.Email, this.Birthday )}>
                  <Form.Group>
                    <Form.Label>Username </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value={Username ?? ''} 
                        placeholder= 'Username must have 2 characters' 
                        onChange={(e) => {this.setUsername(e.target.value)}}
                        required/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value={Email ?? ''} 
                        placeholder= 'Email must include @ symbol' 
                        onChange={(e) => {this.setEmail(e.target.value)}}
                        required/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                      style={{ "width":"24rem", "display":"flex"}}
                        type="text" 
                        value= {Password ?? '' }
                        placeholder= 'Password must have 8 characters' 
                        onChange={(e) => {this.setPassword(e.target.value)}}
                        required/>
                  </Form.Group> 
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
      <Row className="favorites-container justify-content-md-center" >
        <Col className="favorites-header" md={2}><h1>My List</h1></Col>
        {FavoriteMovies.length === 0 && 
          <Col md={12}>
            <div className="favorites-header">
              Let's start adding <a href='/'>movies!</a>🍿
            </div>
          </Col>}
        {FavoriteMovies.length > 0 && 
        movies.map((movie) => {if (movie._id === FavoriteMovies.find((fav)=> fav === movie._id)) {return ( 
          <Col md={4} key={movie._id}>
              <Card className="favorite-movie" style={{"marginTop":"2rem"}}>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" alt="Movie Image" />
                <Card.Body>
                  <Card.Title className="movie-title">{movie.Title}</Card.Title>
                  <Button value={movie._id} variant="secondary" onClick={(e) => this.removeFav(e, movie)}>-</Button> 
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link" onClick={() => {}}>Open</Button>
                  </Link>
                </Card.Body>
              </Card>
          </Col>);
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
