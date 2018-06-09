import { combineReducers } from 'redux';
import EntriesReducer from './reducer_entries';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entries: EntriesReducer,
  form: formReducer
});

export default rootReducer;
