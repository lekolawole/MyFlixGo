import React from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function FavoriteMovies({ favoriteMovieList }) {
  return (
    <div>
      <h1>Favorites</h1>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <Button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from Favorites</Button>
          </div>
        )
      })}
    </div>
  )

}

export default FavoriteMovies;