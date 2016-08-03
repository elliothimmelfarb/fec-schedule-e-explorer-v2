import * as types from '../actions/actionTypes';

export default (state = { candidateSearch: true }, action) => {
  switch (action.type) {
    case types.SWITCH_MODE:
      return Object.assign({}, { candidateSearch: !state.candidateSearch });
    default:
      return state;
  }
};
