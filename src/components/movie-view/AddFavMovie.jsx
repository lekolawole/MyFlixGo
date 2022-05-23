import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from "axios";

export const AddFavMovie = (props) => {
  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  //const { user, movie, token } = props; 
  const [user, setUser] = useState('');
  const { movie } = props;
  const [token, setToken] = useState('');

  const addFavMovie = () => {   
    let user = localStorage.getItem('user');
    const newUser = [...user];
    setUser(newUser);
    console.log(user);
     
    //alert(`${movie.Title} has been added.`);

///////////Testing adding movie data to FavoriteMovies array in Console 
    // const newFavoritesList = [...FavoriteMovies, movie];
    // setFavoriteMovies(newFavoritesList);
      
    axios.post(`/users/${user}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => { 
      // const updatedUser = {
      //   ...user, FavoriteMovies: FavoriteMovies.push(movie._id)
      // }; 
      const newFavoritesList = [...FavoriteMovies, movie];
      setFavoriteMovies(newFavoritesList);
      alert(`${movie.Title} was added to your Favorites.`);
    })
    .catch(function (error) {
      console.log(error);
    });
    //console.log(FavoriteMovies)
  }

  return (
    <div>
      <Button variant="secondary" onClick={()=> addFavMovie(movie)}>+</Button>
      {/* <Button onClick={findUser}>Find User</Button> */}
    </div>
  )
}

