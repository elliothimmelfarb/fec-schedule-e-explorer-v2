import * as types from '../actions/actionTypes';

const initialState = {
  candidatesByName: [],
  candidatesById: {},
  candidateSearchActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NAME_SEARCH_CANDIDATE_SUCCESS:
      return Object.assign({}, state, { candidatesByName: action.list, candidateSearchActive: true});
    case types.COMMITTEES_BY_CANDIDATE_SUCCESS:
      console.log('action:', action);
      const candidatesById = Object.assign({}, state.candidatesById);
      candidatesById[action.id] = {committeesList: action.list};
      return Object.assign({}, state, { candidatesById });
    case types.COMMITTEES_BY_CANDIDATE_FAILURE:
      console.log('fail');
      return state;
    default:
      return state;
  }
}
