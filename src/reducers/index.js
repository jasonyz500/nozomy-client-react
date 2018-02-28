import { combineReducers } from 'redux';
import EntriesReducer from './reducer_entries';
import AuthReducer from './reducer_auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entries: EntriesReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
