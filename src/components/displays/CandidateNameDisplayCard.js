import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CommitteeByCandidateCard from './CommitteeByCandidateCard';
import { getCommitteesByCandidate } from '../../actions/candidateActions';

class CandidateNameDisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }
  }

  toggleDetails() {
    const { id, getDetails, candidatesById } = this.props;
    if (!candidatesById.hasOwnProperty(id)) getDetails(id);
    this.setState({ showDetails: !this.state.showDetails });
  }

  createList() {
    const supportOppose = {
      "O": "Opposing",
      "S": "Supporting",
    }
    const { id, candidatesById } = this.props;
    return candidatesById[id].committeeList.map((committee, index) => {
      return (
        <CommitteeByCandidateCard
          key={index}
          committeeId={committee.committee_id}
          candidateId={committee.candidate_id}
          committeeName={committee.committee_name}
          count={committee.count}
          total={committee.total}
          cycle={committee.cycle}
          supportOppose={supportOppose[committee.support_oppose_indicator]}
          />
      );
    });
  }

  render() {
    const { id, name, office, candidatesById } = this.props
    let list;
    if (this.state.showDetails && candidatesById.hasOwnProperty(id)) list = this.createList();
    return (
      <div className="jumbotron">
        <div className="container row">
          <div className="col-xs-6">
            <p>{name}</p>
          </div>
          <div className="col-xs-6">
            <p>Office Sought: {office}</p>
          </div>
        </div>
        <button onClick={() => this.toggleDetails()} className="btn btn-info form-control">
          {this.state.showDetails ? 'Close' : 'Expand'}
        </button>
        <div>
          {list}
        </div>
      </div>
    );
  }
}

CandidateNameDisplayCard.propTypes = {
  name: PropTypes.string,
  office: PropTypes.string,
  candidatesById: PropTypes.object,
  id: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    candidatesById: state.candidates.candidatesById,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: (id) => dispatch(getCommitteesByCandidate(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateNameDisplayCard);
