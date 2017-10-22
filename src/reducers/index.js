import { combineReducers } from 'redux';
import WeeksReducer from './reducer_weeks';
import EntriesReducer from './reducer_entries';

const rootReducer = combineReducers({
  weeks: WeeksReducer,
  entries: EntriesReducer
});

export default rootReducer;
