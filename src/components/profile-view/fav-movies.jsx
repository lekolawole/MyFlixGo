import React from "react";

function FavMoviesView() {
  const user = localStorage.getItem('user');
  const FavoriteMovies = localStorage.getItem('FavoriteMovies');
  return (
    <div>
      <h1>Favorite Movies</h1>
      <div>
        <div>{user}</div>
        <div>{FavoriteMovies}</div>
      </div>
    </div>
  )
}

export default FavMoviesView;