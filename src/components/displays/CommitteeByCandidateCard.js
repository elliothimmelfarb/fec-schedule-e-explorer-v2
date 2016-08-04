import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSectionEsCrossRef } from '../../actions/sharedActions';

class CommitteeByCandidateCard extends React.Component {
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

  createCommitteesByCandidateList() {
    const { id, candidatesById } = this.props;
    return candidatesById[id].map(committee => {
      return
    })
  }

  render() {
    const { id, name, office, candidatesById } = this.props
    return (
      <div className="jumbotron" onClick={() => toggleDetails()}>
        <div className="container row">
          <div className="col-xs-6">
            <p>{name}</p>
          </div>
          <div className="col-xs-6">
            <p>Office Sought: {office}</p>
          </div>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

CommitteeByCandidateCard.propTypes = {
  name: PropTypes.string,
  office: PropTypes.string,
  candidatesById: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    candidatesById: state.candidates.candidatesById,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getDetails: (id) => dispatch(getCommitteesByCandidate(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeByCandidateCard);
