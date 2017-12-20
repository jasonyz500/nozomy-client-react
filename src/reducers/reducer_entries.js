import _ from 'lodash';
import { FETCH_WEEK, ADD_ENTRY, UPDATE_ENTRY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_WEEK:
      const week = {
        daily: _.reduce(_.filter(action.payload.data, {'is_weekly': false}), function(res, entry) {
          (res[entry.day_of_week_iso] || (res[entry.day_of_week_iso] = [])).push(entry);
          return res;
        }, {}),
        weekly: _.filter(action.payload.data, {'is_weekly': true})
      };
      return { ...state, [action.weekStr]: week };
    case ADD_ENTRY:
      const { is_weekly, week_string } = action.entry;
      if (is_weekly) {
        state[week_string].weekly.append(action.entry);
        return state;
      } else {
        const { day_of_week_iso } = action.entry;
        if (!state[week_string].daily[day_of_week_iso]) {
          state[week_string].daily[day_of_week_iso] = [];
        }
        state[week_string].daily[day_of_week_iso].push(action.entry);
        return state;
      }
    case UPDATE_ENTRY:
      return state; // todo: find entry using weekStr, d.o.w and ID, update it
    default:
      return state;
  }
}
