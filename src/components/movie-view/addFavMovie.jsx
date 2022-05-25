import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from "axios";

export const AddFavMovie = (props) => {
  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  //const { user, movie, token } = props; 
  const [user, setUser] = useState('');
  // let user = localStorage.getItem('user');
  const { movie } = props;
  const [token, setToken] = useState('');
  // console.log(user);

  const removeFav = (e, movie) => {
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

  const addFav = () => {   
    let user = localStorage.getItem('user');
    const newUser = [...user];
    setUser(newUser);
    console.log(user);
     
    //alert(`${movie.Title} has been added.`);

///////////Testing adding movie data to FavoriteMovies array in Console 
    // const newFavoritesList = [...FavoriteMovies, movie];
    // setFavoriteMovies(newFavoritesList);
      
    axios.post(`https://my-flix-22.herokuapp.com/users/${user}/movies/${movie._id}`, 
    // {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(response => { 
      alert(`${movie.Title} was added to your Favorites.`);
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
    console.log(FavoriteMovies)
  }

  return (
    <div>
      <Button variant="secondary" onClick={()=> addFav(movie)}>+</Button>
      {/* <Button onClick={findUser}>Find User</Button> */}
    </div>
  )
}

