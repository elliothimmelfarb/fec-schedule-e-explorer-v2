import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CandidateNameDisplayCard from './CandidateNameDisplayCard';
import CommitteeNameDisplayCard from './CommitteeNameDisplayCard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NameListDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  makeCandidateCards(names) {
    const offices = {
      P: 'President',
      S: 'Senate',
      H: 'House',
    };
    return names.map((name, index) => (
      <CandidateNameDisplayCard
        key={this.props.candidatesByName[index].id}
        id={this.props.candidatesByName[index].id}
        name={this.props.candidatesByName[index].name}
        office={offices[this.props.candidatesByName[index].office_sought]}
      />
    ));
  }


  makeCommitteeCards(names) {
    return names.map((name, index) =>
      <CommitteeNameDisplayCard
        key={index}
        committeeName={this.props.committeesByName[index].name}
        id={this.props.committeesByName[index].id}
      />
    );
  }


  render() {
    const {
      candidateSearchActive,
      committeeSearchActive,
      isCandidateMode,
      committeesByName,
      candidatesByName } = this.props;

    let list;

    if (candidateSearchActive && isCandidateMode) list = this.makeCandidateCards(candidatesByName);
    else if (committeeSearchActive && !isCandidateMode) list = this.makeCommitteeCards(committeesByName);
    else list = <span>Search Above</span>;

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="cards" transitionEnterTimeout={400} transitionLeaveTimeout={200}>
          {list}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

NameListDisplay.propTypes = {
  candidatesByName: PropTypes.array,
  committessByName: PropTypes.array,
  candidateSearchActive: PropTypes.bool.isRequired,
  committeeSearchActive: PropTypes.bool.isRequired,
  isCandidateMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    candidatesByName: state.candidates.candidatesByName,
    committeesByName: state.committees.committeesByName,
    candidateSearchActive: state.candidates.candidateSearchActive,
    committeeSearchActive: state.committees.committeeSearchActive,
    isCandidateMode: state.global.isCandidateMode,
  };
}

export default connect(mapStateToProps)(NameListDisplay);
