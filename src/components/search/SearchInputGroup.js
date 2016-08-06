import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { switchMode } from '../../actions/globalStateActions';
import { nameSearchCandidate, updateCandidateInput } from '../../actions/candidateActions';
import { nameSearchCommittee, updateCommitteeInput } from '../../actions/committeeActions';

const style = {
  outer: {
    maxWidth: 700,
    margin: '0 auto',
  },
  button: {
    marginBottom: -30,
  },
  label: {
    fontSize: 20,
    position: 'relative',
  },
  input: {
    fontSize: '30px',
    height: '60px',
    textAlign: 'center',
    boxShadow: '-6px 10px 16px -9px #3c3c3c',
    marginBottom: '20px',
  },
  hr: {
    borderColor: 'rgb(179, 178, 178)',
    width: '60%',
  }
};

class SearchInputGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isCandidateMode,
      switchMode,
      search,
      candidateSearchInput,
      committeeSearchInput,
      updateInput,
    } = this.props;

    const input = isCandidateMode ? candidateSearchInput : committeeSearchInput;

    return (
      <div style={style.outer}>
        <hr style={style.hr}/>
        <form
          onSubmit={e => {
            e.preventDefault();
            search(isCandidateMode, isCandidateMode ? candidateSearchInput : committeeSearchInput);
          }}
          className="form-horizontal"
          >
          <div className="row">
            <label
              style={style.label}
              className="col-sm-12"
              htmlFor="searchInput">
              Search by {isCandidateMode ? 'candidate' : 'committee'}
            </label>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                style={style.input}
                value={input}
                type="text"
                className="form-control"
                placeholder={isCandidateMode ? 'candidate' : 'committee'}
                onChange={e => updateInput(isCandidateMode, e.target.value)}
                />
            </div>
          </div>
          <button className="btn btn-success">Search for {isCandidateMode ? 'candidates' : 'committees'}</button>
          <hr style={style.hr}/>
          <div>
            <button
              style={style.button}
              type="button"
              className={!isCandidateMode ? "btn btn-info" : "btn btn-warning"}
              onClick={switchMode}
              >
              {isCandidateMode ? 'Switch to Committee Search' : 'Switch to Candidate Search'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SearchInputGroup.propTypes = {
  isCandidateMode: PropTypes.bool.isRequired,
  switchMode: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  candidateSearchInput: PropTypes.string,
  committeeSearchInput: PropTypes.string,
  updateInput: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isCandidateMode: state.global.isCandidateMode,
    candidateSearchInput: state.candidates.searchInput,
    committeeSearchInput: state.committees.searchInput,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchMode: () => dispatch(switchMode()),
    search: (isCandidateMode, name) => {
      if (isCandidateMode) return dispatch(nameSearchCandidate(name));
      return dispatch(nameSearchCommittee(name));
    },
    updateInput: (isCandidateMode, value) => {
      if (isCandidateMode) return dispatch(updateCandidateInput(value));
      return dispatch(updateCommitteeInput(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputGroup);
