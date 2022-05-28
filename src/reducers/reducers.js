import { combineReducers } from 'redux';

import { EDIT_USER, SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visbilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value  
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value
    default: 
      return state
  }
}

function getStateOfUser() {
  const accessToken = localStorage.getItem('token');
  const authUser = localStorage.getItem('user');
  return {
    token: accessToken,
    user: authUser
  }
}
function update(state = getStateOfUser(), action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state, 
        token: action.value.accessToken,
        user: action.value.authUser
      }
      case EDIT_USER: 
      return {
        ...state, 
        user: action.value
      };
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visbilityFilter, 
  movies, 
  user, 
  update
});


export default moviesApp