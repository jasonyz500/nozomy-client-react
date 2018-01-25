import _ from 'lodash';
import { FETCH_WEEK, FETCH_ALL, ADD_ENTRY, CREATE_ENTRY, UPDATE_ENTRY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_WEEK:
      const { entries } = action.payload.data;
      const dailyEntries = {};
      _.forEach(entries, (entry) => {
        (dailyEntries[entry.day_of_week_iso] || []).push(entry);
      });
      const res = {
        daily: dailyEntries,
        weekly: _.filter(entries, 'is_weekly')
      }
      return { ...state, [action.payload.data.week_string]: res }
    case ADD_ENTRY:
      const { is_weekly, week_string } = action.entry;
      if (is_weekly) {
        state[week_string].weekly.push(action.entry);
        return state;
      } else {
        const { day_of_week_iso } = action.entry;
        if (!state[week_string].daily[day_of_week_iso]) {
          state[week_string].daily[day_of_week_iso] = [];
        }
        state[week_string].daily[day_of_week_iso].push(action.entry);
        return state;
      }
    case FETCH_ALL:
      return action.payload.data
    case CREATE_ENTRY:
      return state;
    case UPDATE_ENTRY:
      return state; // todo: find entry using weekStr, d.o.w and ID, update it
    default:
      return state;
  }
}
