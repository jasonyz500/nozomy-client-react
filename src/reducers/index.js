import { combineReducers } from 'redux';
import EntriesReducer from './reducer_entries';

const rootReducer = combineReducers({
  entries: EntriesReducer
});

export default rootReducer;
