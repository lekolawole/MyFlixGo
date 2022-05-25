import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import '../profile-view/profile-view.scss';

export const AddFavMovie = (props) => {
  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  const [user, setUser] = useState('');
  const { movie } = props;
  const [token, setToken] = useState('');

 
  const removeFav = (e, movie) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://my-flix-22.herokuapp.com/users/${username}/movies/${movie._id}`, 
     {
       headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      alert('Removed from list');
      const addButton = document.querySelector('.add-button');
      addButton.style.display = 'block';

      const remButton = document.querySelector('.remove-button');
      remButton.style.display = 'none';
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
      
    axios.post(`https://my-flix-22.herokuapp.com/users/${user}/movies/${movie._id}`, 
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(response => { 
      alert(`${movie.Title} was added to your Favorites.`);
      const addButton = document.querySelector('.add-button');
      addButton.style.display = 'none';

      const remButton = document.querySelector('.remove-button');
      remButton.style.display = 'block';
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
    console.log(FavoriteMovies)
  }

  return (
    <div>
      <Button className="remove-button" style={{"display":"none"}} value={movie._id} variant="secondary" onClick={(e) => removeFav(e, movie)}>-</Button>
      <Button className="add-button" variant="secondary" onClick={()=> addFav(movie)}>+</Button>
    </div>
  )
}

