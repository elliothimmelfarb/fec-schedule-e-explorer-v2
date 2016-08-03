import * as types from './actionTypes';
import openFECApi from '../api/openFECApi';

function nameSearchCandidateSuccess(response) {
  return { type: types.NAME_SEARCH_CANDIDATE_SUCCESS, data: response };
}

function nameSearchCandidateFailure(error) {
  return { type: types.NAME_SEARCH_CANDIDATE_FAILURE, data: error };
}

function nameSearchCommitteeSuccess(response) {
  return { type: types.NAME_SEARCH_COMMITTEE_SUCCESS, data: response };
}

function nameSearchCommitteeFailure(error) {
  return { type: types.NAME_SEARCH_COMMITTEE_FAILURE, data: error };
}

export function switchMode() {
  return { type: types.SWITCH_MODE };
}

export function nameSearchCandidate(name) {
  return dispatch =>
    openFECApi.nameSearchCandidate(name)
      .then(response => {
        dispatch(nameSearchCandidateSuccess(response));
      }).catch(error => {
        dispatch(nameSearchCandidateFailure(error));
      });
}

export function nameSearchCommittee(name) {
  return dispatch =>
    openFECApi.nameSearchCommittee(name)
      .then(response => {
        dispatch(nameSearchCommitteeSuccess(response));
      }).catch(error => {
        dispatch(nameSearchCommitteeFailure(error));
      });
}
