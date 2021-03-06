//Action Types 
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const EDIT_USER = 'EDIT_USER';

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

export function setUser(value) {
  return {
    type: SET_USER,
    value
  }
}

export function update(value) {
  return {
    type: EDIT_USER,
    value
  }
}