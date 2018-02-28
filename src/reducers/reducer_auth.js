import { LOGIN } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log(action.payload.data);
      return state;
    default:
      return state;
  }
} 