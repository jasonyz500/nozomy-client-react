import { LOGIN, AUTH_ERROR } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('auth_token', action.payload.data);
      return { ...state, error: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
} 