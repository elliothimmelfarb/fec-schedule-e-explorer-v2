import * as types from '../actions/actionTypes';

const initialState = {
  candidatesByName: [],
  candidatesById: {},
  candidateSearchActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NAME_SEARCH_CANDIDATE_SUCCESS:
      console.log('action:', action)
      return Object.assign({}, state, { candidatesByName: action.list, candidateSearchActive: true});
    default:
      return state;
  }
}
