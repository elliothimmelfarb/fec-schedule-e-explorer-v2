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

function scheduleEsByCommitteeSuccess(list, committeeId, candidateId) {
  return { type: types.SCHEDULE_ES_BY_COMMITTEE_SUCCESSS, list, committeeId, candidateId };
}

function scheduleEsByCommitteeFailure(error) {
  // console.log(error);
  return { type: types.SCHEDULE_ES_BY_COMMITTEE_FAILURE, error };
}

export const updateCandidateInput = value => {
  return { type: types.UPDATE_CANDIDATE_INPUT, value };
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
  return dispatch =>
    openFECApi.getCommitteesByCandidate(id)
      .then(response => {
        dispatch(getCommitteesByCandidateSuccess(response.data, id));
      }).catch(error => {
        dispatch(getCommitteesByCandidateFailure(error));
      });
}

export function getScheduleEFilingsByCommittee(committeeId, candidateId) {
  return dispatch =>
    openFECApi.scheduleERelationshipHistory(committeeId, candidateId)
      .then(response => {
        dispatch(scheduleEsByCommitteeSuccess(response.data, committeeId, candidateId));
      }).catch(error => {
        dispatch(scheduleEsByCommitteeFailure(error));
      });
}
