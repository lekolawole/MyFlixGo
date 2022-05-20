import React from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import './profile-view.scss';
import axios from "axios";

function FavMoviesView() {
  let token = localStorage.getItem('token');
  console.log(token)
  const user = localStorage.getItem('user');
  

  //////////////// TESTING CONVERTING FavoriteMoviesObj INTO ARRAY (movieArr)
  const FavoriteMovies = localStorage.getItem('FavoriteMovies');
  const FavoriteMoviesObj = FavoriteMovies.split(',');
    // console.log(typeof(FavoriteMoviesObj));
    // console.log(FavoriteMoviesObj);

    // Assigns _id key to object to reference later
    const newMoviesObj = FavoriteMoviesObj.map((item) => {
      return {
        _id: item
      }
    });

    //creates new array from previous object
    const moviesArr = Object.entries(newMoviesObj).map(entry => entry[1]
    );
    //console.log(newMoviesObj)
    //const moviesArr = Object.entries(newMoviesObj).map(entry => entry[1]);
    console.log(moviesArr);
  
//////////// Testing GET request to produce similar grid of movies as in MainView
  
  // console.log(token);
  // const getMovies = (token) => {
  //   axios.get('https://my-flix-22.herokuapp.com/movies', {
  //     headers: { Authorization: `Bearer ${token}`}
  //   })
  //   .then(response => {
  //     // Assign the result to the state
  //     this.setState({
  //       movies: response.data
  //     });
  //     console.log(movies);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     });
  // }

  return ( //Maps new array (moviesArr) - need to write function to connect _id from moviesArr to API
    moviesArr.map((movie) => {
    <Col>
      <div key={movie._id}>
        <img src={movie.ImagePath} />
        <Link to={`/movies/${movie._id}`}>
          <h4>{movie.Title}</h4>
          <h4>{movie.Title}</h4>
        </Link> 
      </div>
    </Col>
    })
  )
}

export default FavMoviesView;