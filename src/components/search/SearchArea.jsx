import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import InputGroup from './InputGroup';
import {
  switchMode,
  nameSearchCandidate,
  nameSearchCommittee,
} from '../../actions/nameSearchActions';

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
        <h3 style={style.h3}>Search for Section E Filings by Candidate or Committee</h3>
        <InputGroup
          switchMode={this.props.switchMode}
          search={this.props.search}
          target={this.props.candidateSearch ? 'candidate' : 'committee'}
          candidateSearch={this.props.candidateSearch}
        />
      </div>
    );
  }
}

SearchArea.propTypes = {
  candidateSearch: PropTypes.bool.isRequired,
  switchMode: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    candidateSearch: state.nameSearch.candidateSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchMode: () => dispatch(switchMode()),
    search: (candidateSearch, name) => {
      if (candidateSearch) return dispatch(nameSearchCandidate(name));
      return dispatch(nameSearchCommittee(name));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);
