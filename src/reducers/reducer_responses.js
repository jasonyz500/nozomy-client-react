import { UPDATE_RESPONSE } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_RESPONSE:
      return state; // todo: find response using weekStr, d.o.w and ID, update it
    default:
      return state;
  }
}