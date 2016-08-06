import * as types from '../actions/actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case types.SCHEDULE_ES_BY_COMMITTEE_SUCCESSS: {
      const candidatesById = Object.assign({}, state.candidatesById);
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
