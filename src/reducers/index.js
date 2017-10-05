import { combineReducers } from 'redux';
import WeekReducer from './reducer_week';

const rootReducer = combineReducers({
  week: WeekReducer
});

export default rootReducer;
