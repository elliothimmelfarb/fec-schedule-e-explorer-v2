import { combineReducers } from 'redux';
import candidates from './candidatesReducer';
import global from './globalStateReducer';

const rootReducer = combineReducers({
  global,
  candidates,
});

export default rootReducer;
