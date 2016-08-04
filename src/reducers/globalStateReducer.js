import * as types from '../actions/actionTypes';

const initialState = {
  isCandidateMode: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_MODE:
      return Object.assign({}, state, { isCandidateMode: !state.isCandidateMode });
    default:
      return state;
  }
}
