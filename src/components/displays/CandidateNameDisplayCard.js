import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function CandidateNameDisplayCard({
  name,
  office,
  showDetails,
}) {
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

    </div>
  );
}

CandidateNameDisplayCard.propTypes = {
  name: PropTypes.string,
  office: PropTypes.string,
  showDetails: PropTypes.bool,
};

function mapStateToProps(state, ownProps) {
  return {
    candidateDetails: state.nameSearch.candidateSearch,
  };
}

export default connect(mapStateToProps)(CandidateNameDisplayCard);
