import * as types from './actionTypes';
import openFECApi from '../api/openFECApi';

export function switchMode() {
  return { type: types.SWITCH_MODE };
}
