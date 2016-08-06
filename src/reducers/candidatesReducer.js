import * as types from '../actions/actionTypes';
import deepcopy from 'deepcopy';

const initialState = {
  candidatesByName: [],
  candidatesById: {},
  candidateSearchActive: false,
  searchInput: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CANDIDATE_INPUT: {
      return Object.assign({}, state, { searchInput: action.value });
    }

    case types.NAME_SEARCH_CANDIDATE_SUCCESS: {
      return Object.assign({}, state, { candidatesByName: action.list, candidateSearchActive: true});
    }

    case types.COMMITTEES_BY_CANDIDATE_SUCCESS: {
      const candidatesById = Object.assign({}, state.candidatesById);
      candidatesById[action.id] = {committeeList: action.list};
      return Object.assign({}, state, { candidatesById });
    }

    case types.COMMITTEES_BY_CANDIDATE_FAILURE: {
      console.log(action.error);
      return state;
    }

    case types.SCHEDULE_ES_BY_COMMITTEE_SUCCESSS: {
      // const candidatesById = Object.assign({}, state.candidatesById);
      const candidatesById = deepcopy(state.candidatesById);
      if (!candidatesById[action.candidateId].hasOwnProperty('schedEByCommitteeList')) {
        candidatesById[action.candidateId].schedEByCommitteeList = {};
      }
      candidatesById[action.candidateId].schedEByCommitteeList[action.committeeId] = action.list;
      return Object.assign({}, state, { candidatesById });
    }

    case types.SCHEDULE_ES_BY_COMMITTEE_FAILURE: {
      console.log(action.error);
      return state;
    }

    default: {
      return state;
    }
  }
}
