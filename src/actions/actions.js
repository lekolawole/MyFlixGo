//Action Types 
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

//Action Creators
export function setMovies(value) {
  //initializes movies list with movies
  return { 
    type: SET_MOVIES, 
    value 
  }
}

export function setFilter(value) {
  return { 
    type: SET_FILTER, 
    value 
  }
}