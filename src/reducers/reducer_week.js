import { FETCH_WEEK } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_WEEK:
      return state;
    default:
      return state;
  }
}