import { ADD_ENTRY, UPDATE_ENTRY } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ENTRY:
      const { is_weekly, week_string } = action.entry;
      if (is_weekly) {
        state.weeks[week_string].weekly_entries.append(action.entry);
        return state;
      } else {
        const { day_of_week_iso } = action.entry;
        state.weeks[week_string].daily_entries[day_of_week_iso].append(action.entry);
        return state;
      }
    case UPDATE_ENTRY:
      return state; // todo: find entry using weekStr, d.o.w and ID, update it
    default:
      return state;
  }
}