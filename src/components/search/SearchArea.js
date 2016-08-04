import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchInputGroup from './SearchInputGroup';
import { switchMode } from '../../actions/globalStateActions';
import { nameSearchCandidate } from '../../actions/candidateActions';
import { nameSearchCommittee } from '../../actions/committeeActions';

const style = {
  outer: {
    textAlign: 'center',
  },
  h3: {
    marginBottom: 50,
  },
};


class SearchArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={style.outer} className="jumbotron">
        <h3 style={style.h3}>
          Search for Section E Filings by {
            this.props.isCandidateSearch ? 'Candidate' : 'Committee'
          }
        </h3>
        <SearchInputGroup />
      </div>
    );
  }
}

SearchArea.propTypes = {
  isCandidateMode: PropTypes.bool.isRequired,
  switchMode: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isCandidateMode: state.global.isCandidateMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchMode: () => dispatch(switchMode()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);
