import { combineReducers } from 'redux';
import WeeksReducer from './reducer_weeks';

const rootReducer = combineReducers({
  weeks: WeeksReducer
});

export default rootReducer;
