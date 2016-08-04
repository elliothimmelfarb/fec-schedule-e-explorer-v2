import * as types from './actionTypes';
import openFECApi from '../api/openFECApi';

function nameSearchCommitteeSuccess(response) {
  return { type: types.NAME_SEARCH_COMMITTEE_SUCCESS, data: response };
}

function nameSearchCommitteeFailure(error) {
  return { type: types.NAME_SEARCH_COMMITTEE_FAILURE, data: error };
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
