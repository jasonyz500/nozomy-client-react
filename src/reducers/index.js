import { combineReducers } from 'redux';
import WeeksReducer from './reducer_weeks';
import ResponsesReducer from './reducer_responses';

const rootReducer = combineReducers({
  weeks: WeeksReducer,
  responses: ResponsesReducer
});

export default rootReducer;
