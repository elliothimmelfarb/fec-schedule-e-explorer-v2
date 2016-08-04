import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CandidateNameDisplayCard from './CandidateNameDisplayCard';
import CommitteeNameDisplayCard from './CommitteeNameDisplayCard';

class NameListDisplay extends React.Component {
  constructor(props) {
    super(props);
  }


  // candidateOrCommittee(names) {
  //   if (this.props.isCandidateMode) return this.makeCandidateCards(names);
  //   return this.makeCommitteeCards(names);
  // }


  makeCandidateCards(names) {
    console.log('names:', names);
    const offices = {
      P: 'President',
      S: 'Senate',
      H: 'House',
    };
    return names.map((name, index) => (
      <CandidateNameDisplayCard
        key={this.props.candidatesByName[index].id}
        showDetails={false}
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
    let list;
    if (this.props.candidateSearching && this.props.isCandidateMode)
      list = this.makeCandidateCards(this.props.candidatesByName);
    else list = (<span>Search Above</span>);
    console.log('list', list);
    return (
      <div>
        {list}
      </div>
    );
  }
}

NameListDisplay.propTypes = {
  candidatesByName: PropTypes.array,
  candidateSearching: PropTypes.bool.isRequired,
  isCandidateMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log('state:', state);
  return {
    candidatesByName: state.candidates.candidatesByName,
    candidateSearching: state.candidates.candidateSearchActive,
    isCandidateMode: state.global.isCandidateMode,
  };
}

export default connect(mapStateToProps)(NameListDisplay);
