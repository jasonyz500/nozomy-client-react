import { UPDATE_ENTRY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_ENTRY:
      return state; // todo: find entry using weekStr, d.o.w and ID, update it
    default:
      return state;
  }
}