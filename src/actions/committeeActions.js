import * as types from './actionTypes';
import openFECApi from '../api/openFECApi';

function nameSearchCommitteeSuccess(list) {
  return { type: types.NAME_SEARCH_COMMITTEE_SUCCESS, list };
}

function nameSearchCommitteeFailure(error) {
  return { type: types.NAME_SEARCH_COMMITTEE_FAILURE, error };
}

function getCandidatesByCommitteeSuccess(list, id) {
  return { type: types.CANDIDATES_BY_COMMITTEE_SUCCESS, list, id };
}

function getCandidatesByCommitteeFailure(error) {
  return { type: types.CANDIDATES_BY_COMMITTEE_FAILURE, error };
}

function scheduleEsByCandidateSuccess(list, committeeId, candidateId) {
  return { type: types.SCHEDULE_ES_BY_CANDIDATE_SUCCESSS, list, committeeId, candidateId };
}

function scheduleEsByCandidateFailure(error) {
  return { type: types.SCHEDULE_ES_BY_CANDIDATE_FAILURE, error };
}

export const updateCommitteeInput = value => {
  return { type: types.UPDATE_COMMITTEE_INPUT, value };
}

export function nameSearchCommittee(name) {
  return dispatch =>
    openFECApi.nameSearchCommittee(name)
      .then(response => {
        dispatch(nameSearchCommitteeSuccess(response.data));
      }).catch(error => {
        dispatch(nameSearchCommitteeFailure(error));
      });
}

export function getCandidatesByCommittee(id) {
  return dispatch =>
    openFECApi.getCandidatesByCommittee(id)
      .then(response => {
        dispatch(getCandidatesByCommitteeSuccess(response.data, id));
      }).catch(error => {
        dispatch(getCandidatesByCommitteeFailure(error));
      });
}

export function getScheduleEFilingsByCandidate(committeeId, candidateId) {
  return dispatch =>
    openFECApi.scheduleERelationshipHistory(committeeId, candidateId)
      .then(response => {
        dispatch(scheduleEsByCandidateSuccess(response.data, committeeId, candidateId));
      }).catch(error => {
        dispatch(scheduleEsByCandidateFailure(error));
      });
}
