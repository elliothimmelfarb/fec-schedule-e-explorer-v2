import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { switchMode } from '../../actions/globalStateActions';
import { nameSearchCandidate } from '../../actions/candidateActions';

const style = {
  outer: {
    maxWidth: 700,
    margin: '0 auto',
  },
  button: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    position: 'relative',
    left: 20,
  },
};

class SearchInputGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    }
  }

  render() {
    const { isCandidateMode, switchMode, search } = this.props;
    return (
      <div style={style.outer}>
        <form
          onSubmit={e => {
            e.preventDefault();
            search(isCandidateMode, this.state.inputValue);
            this.inputValue = '';
          }}
          className="form-horizontal"
          >
          <div className="form-group">
            <label
              style={style.label}
              className="col-sm-3"
              htmlFor="searchInput">
              Search by {isCandidateMode ? 'candidate' : 'committee'}
            </label>
            <div className="col-sm-9">
              <input
                value={this.state.inputValue}
                type="text"
                className="form-control"
                placeholder={isCandidateMode ? 'candidate' : 'committee'}
                onChange={e => this.setState({ inputValue: e.target.value })}
                />
            </div>
          </div>
          <button className="btn btn-success">Search</button>
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
};

function mapStateToProps(state) {
  return {
    isCandidateMode: state.global.isCandidateMode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchMode: () => dispatch(switchMode()),
    search: (isCandidateMode, name) => {
      if (isCandidateMode) return dispatch(nameSearchCandidate(name));
      return dispatch(nameSearchCommittee(name));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputGroup);
