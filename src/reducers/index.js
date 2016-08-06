import { combineReducers } from 'redux';
import candidates from './candidatesReducer';
import global from './globalStateReducer';
import committees from './committeesReducer';

const rootReducer = combineReducers({
  global,
  candidates,
  committees,
});

export default rootReducer;
