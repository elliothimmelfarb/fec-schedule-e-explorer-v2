import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CandidateNameDisplayCard from './CandidateNameDisplayCard';
import CommitteeNameDisplayCard from './CommitteeNameDisplayCard';

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


  // makeCommitteeCards(names) {
  //   return names.map((name, index) =>
  //     <CommitteeNameDisplayCard
  //       key={index}
  //       name={this.props.names.dat[index].name}
  //     />
  //   );
  // }


  render() {
    const {
      candidateSearchActive,
      isCandidateMode,
      candidatesByName } = this.props;

    let list;

    if (candidateSearchActive && isCandidateMode) list = this.makeCandidateCards(candidatesByName);
    else list = <span>Search Above</span>;

    return (
      <div>
        {list}
      </div>
    );
  }
}

NameListDisplay.propTypes = {
  candidatesByName: PropTypes.array,
  candidateSearchActive: PropTypes.bool.isRequired,
  isCandidateMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    candidatesByName: state.candidates.candidatesByName,
    candidateSearchActive: state.candidates.candidateSearchActive,
    isCandidateMode: state.global.isCandidateMode,
  };
}

export default connect(mapStateToProps)(NameListDisplay);
