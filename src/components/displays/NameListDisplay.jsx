import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CandidateNameDisplayCard from './CandidateNameDisplayCard';
import CommitteeNameDisplayCard from './CommitteeNameDisplayCard';

class NameListDisplay extends React.Component {
  constructor(props) {
    super(props);
  }


  candidateOrCommittee(names) {
    if (this.props.isCandidateMode) return this.makeCandidateCards(names);
    return this.makeCommitteeCards(names);
  }


  makeCandidateCards(names) {
    const offices = {
      P: 'President',
      S: 'Senate',
      H: 'House',
    };
    return names.map((name, index) => (
      <CandidateNameDisplayCard
        key={index}
        showDetails={false}
        name={this.props.names.data[index].name}
        office={offices[this.props.names.data[index].office_sought]}
      />
    ));
  }


  makeCommitteeCards(names) {
    return names.map((name, index) =>
      <CommitteeNameDisplayCard
        key={index}
        name={this.props.names.data[index].name}
      />
    );
  }


  render() {
    console.log('nameDisplay.props:', this.props);
    let list;
    // if (this.props.candidateSearching) list = this.candidateOrCommittee();
    return (
      <div>
        {
          this.props.candidateSearching ?
          <h1>List</h1> :
            <span>Search Above</span>
        }
      </div>
    );
  }
}

NameListDisplay.propTypes = {
  candidateNames: PropTypes.array,
  candidateSearching: PropTypes.bool.isRequired,
  isCandidateMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    candidateNames: state.candidates.candidatesByName,
    candidateSearching: state.candidates.isSearching,
    isCandidateMode: state.global.isCandidateMode,
  };
}

export default connect(mapStateToProps)(NameListDisplay);
