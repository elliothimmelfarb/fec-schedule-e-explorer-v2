import axios from 'axios';

// const baseURI = 'http://localhost:8000';
const baseURI = 'https://section-e-explorer-backend.herokuapp.com/api/open_fec';
const nameSearchCandidate = (name) => `${baseURI}/search/candidate_name/${name}`;
const nameSearchCommittee = (name) => `${baseURI}/search/committee_name/${name}`;
const getCommitteesByCandidate = (id) => `${baseURI}/schedule_e/by_candidate/${id}`;
const getCandidatesByCommittee = (id) => `${baseURI}/schedule_e/by_committee/${id}`;
const scheduleERelationship = (committeeId, candidateId) =>
  `${baseURI}/schedule_e/by_committee/${committeeId}/by_candidate/${candidateId}`;

export default {
  nameSearchCandidate(name) {
    const nameURI = encodeURI(name);
    return axios.get(nameSearchCandidate(nameURI));
  },
  nameSearchCommittee(name) {
    const nameURI = encodeURI(name);
    return axios.get(nameSearchCommittee(nameURI));
  },
  getCommitteesByCandidate(id) {
    return axios.get(getCommitteesByCandidate(id));
  },
  getCandidatesByCommittee(id) {
    return axios.get(scheduleEByCommittee(id));
  },
  scheduleERelationshipHistory(committeeId, candidateId) {
    return axios.get(scheduleERelationship(committeeId, candidateId));
  },
};
