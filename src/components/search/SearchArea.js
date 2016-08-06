import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchInputGroup from './SearchInputGroup';
import { switchMode } from '../../actions/globalStateActions';
import { nameSearchCandidate } from '../../actions/candidateActions';
import { nameSearchCommittee } from '../../actions/committeeActions';

const style = {
  h3: {
    marginBottom: 50,
    fontSize: '40px',
  },
  jumbotron: {
    border: '1px solid rgb(107, 107, 107)',
    textAlign: 'center',
    boxShadow: '-6px 10px 16px -9px #3c3c3c;',
  }
};


class SearchArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={style.jumbotron} className="jumbotron">
        <h3 style={style.h3}>
          Search for Schedule E Filings by {
            this.props.isCandidateMode ? 'Candidate' : 'Committee'
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
