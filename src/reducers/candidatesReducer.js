import * as types from '../actions/actionTypes';

const initialState = {
  candidatesByName: [],
  candidatesById: {},
  candidateSearchActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NAME_SEARCH_CANDIDATE_SUCCESS: {
      return Object.assign({}, state, { candidatesByName: action.list, candidateSearchActive: true});
    }

    case types.COMMITTEES_BY_CANDIDATE_SUCCESS: {
      let candidatesById = Object.assign({}, state.candidatesById);
      candidatesById[action.id] = {committeeList: action.list};
      return Object.assign({}, state, { candidatesById });
    }

    case types.COMMITTEES_BY_CANDIDATE_FAILURE: {
      console.log(action.error);
      return state;
    }

    case types.SCHEDULE_ES_BY_COMMITTEE_SUCCESSS: {
      let candidatesById = Object.assign({}, state.candidatesById);
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
