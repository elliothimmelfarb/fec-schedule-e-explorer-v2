import * as types from './actionTypes';
import openFECApi from '../api/openFECApi';

function nameSearchCandidateSuccess(list) {
  return { type: types.NAME_SEARCH_CANDIDATE_SUCCESS, list };
}

function nameSearchCandidateFailure(error) {
  return { type: types.NAME_SEARCH_CANDIDATE_FAILURE, error };
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
