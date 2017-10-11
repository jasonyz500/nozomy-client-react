import { SELECT_WEEK, FETCH_WEEK } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_WEEK:
      return { ...state, selectedWeek: action.payload };
    case FETCH_WEEK:
      return { ...state, [action.payload.data.week_string]: action.payload.data };
    default:
      return state;
  }
}