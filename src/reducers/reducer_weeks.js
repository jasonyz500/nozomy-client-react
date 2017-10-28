import _ from 'lodash';
import { FETCH_WEEK } from '../actions';

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
    default:
      return state;
  }
}