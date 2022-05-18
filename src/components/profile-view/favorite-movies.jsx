import React from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function FavoriteMovies({ user }) {
  
  return (
    <div>
      <h1>Favorites</h1>
      {user.FavoriteMovies.map((movie) => {
        return (
          <div key={movie._id}>
            <img src={movie.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movie.Title}</h4>
            </Link>
            <Button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from Favorites</Button>
          </div>
        )
      })}
    </div>
  )

}

export default FavoriteMovies;