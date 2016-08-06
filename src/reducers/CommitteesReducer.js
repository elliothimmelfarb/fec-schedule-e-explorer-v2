import * as types from '../actions/actionTypes';

const initialState = {
  committeesByName: [],
  committeesById: {},
  committeeSearchActive: false,
  searchInput: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_COMMITTEE_INPUT: {
      return Object.assign({}, state, { searchInput: action.value });
    }

    case types.NAME_SEARCH_COMMITTEE_SUCCESS: {
      return Object.assign({}, state, { committeesByName: action.list, committeeSearchActive: true});
    }

    case types.CANDIDATES_BY_COMMITTEE_SUCCESS: {
      console.log(action)
      const committeesById = Object.assign({}, state.committeesById);
      committeesById[action.id] = {committeeList: action.list};
      return Object.assign({}, state, { committeesById });
    }

    case types.CANDIDATES_BY_COMMITTEE_FAILURE: {
      console.log(action.error);
      return state;
    }

    case types.SCHEDULE_ES_BY_CANDIDATE_SUCCESSS: {
      const committeesById = Object.assign({}, state.committeesById);
      if (!committeesById[action.candidateId].hasOwnProperty('schedEByCandidateList')) {
        committeesById[action.candidateId].schedEByCandidateList = {};
      }
      committeesById[action.candidateId].schedEByCandidateList[action.committeeId] = action.list;
      return Object.assign({}, state, { committeesById });
    }

    case types.SCHEDULE_ES_BY_CANDIDATES_FAILURE: {
      console.log(action.error);
      return state;
    }

    default: {
      return state;
    }
  }
}
