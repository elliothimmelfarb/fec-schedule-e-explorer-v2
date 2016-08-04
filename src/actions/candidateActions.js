import * as types from './actionTypes';
import openFECApi from '../api/openFECApi';

function nameSearchCandidateSuccess(list) {
  return { type: types.NAME_SEARCH_CANDIDATE_SUCCESS, list };
}

function nameSearchCandidateFailure(error) {
  return { type: types.NAME_SEARCH_CANDIDATE_FAILURE, error };
}

function getCommitteesByCandidateSuccess(list, id) {
  return { type: types.COMMITTEES_BY_CANDIDATE_SUCCESS, list, id };
}

function getCommitteesByCandidateFailure(error) {
  return { type: types.COMMITTESS_BY_CANDIDATE_FAILURE, error };
}

export function nameSearchCandidate(name) {
  return dispatch =>
    openFECApi.nameSearchCandidate(name)
      .then(response => {
        dispatch(nameSearchCandidateSuccess(response.data));
      }).catch(error => {
        dispatch(nameSearchCandidateFailure(error));
      });
}

export function getCommitteesByCandidate(id) {
  console.log('here');
  return dispatch =>
    openFECApi.getCommitteesByCandidate(id)
      .then(response => {
        dispatch(getCommitteesByCandidateSuccess(response.data, id));
      }).catch(error => {
        dispatch(getCommitteesByCandidateFailure(error));
      });
}
