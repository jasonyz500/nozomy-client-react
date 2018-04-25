import jwt_decode from 'jwt-decode'
import { LOGIN, AUTH_ERROR } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      let decoded = jwt_decode(action.payload.data);
      localStorage.setItem('name', decoded.name);
      localStorage.setItem('auth_token', action.payload.data);
      return { ...state, error: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
} 