import _ from 'lodash';
import { FETCH_ENTRIES_WITH_QUERY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_WITH_QUERY:
      _.each(action.payload.data, function(entry) {
        const weekStr = entry.week_string;
        if (!state[weekStr]) {
          state[weekStr] = {
            weekly: [],
            daily: []
          };
        }
        if (entry.is_weekly) {
          state[weekStr].weekly.push(entry._id);
        } else {
          state[weekStr].daily.push(entry._id);
        }
      });
      return state;
    default:
      return state;
  }
}