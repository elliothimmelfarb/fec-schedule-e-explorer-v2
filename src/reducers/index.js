import { combineReducers } from 'redux';
import nameSearch from './nameSearchReducer';

const rootReducer = combineReducers({
  nameSearch,
});

export default rootReducer;
