import * as types from '../actions/actionTypes';

const initialState = {
  candidatesByName: [],
  candidateId: {},
  isSearching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NAME_SEARCH_CANDIDATE_SUCCESS:
      console.log('action:', action)
      return Object.assign({}, state, { candidatesByName: action.list, isSearching: true});
    default:
      return state;
  }
}
