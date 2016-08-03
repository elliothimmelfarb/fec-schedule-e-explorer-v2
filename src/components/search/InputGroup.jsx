import React, { PropTypes } from 'react';

const style = {
  outer: {
    maxWidth: 700,
    margin: '0 auto',
  },
  button: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    position: 'relative',
    left: 20,
  },
};

export default function InputGroup(props) {
  return (
    <div style={style.outer}>
      <form className="form-horizontal">
        <div className="form-group">
          <label
            style={style.label}
            className="col-sm-3"
            htmlFor="searchInput">
              Search by {props.target}
          </label>
          <div className="col-sm-9">
            <input type="text" className="form-control" placeholder={props.target} />
          </div>
        </div>
        <div>
          <button
            style={style.button}
            type="button"
            className={!props.candidateSearch ? "btn btn-info" : "btn btn-warning"}
            onClick={props.switchMode}
          >
            {props.candidateSearch ? 'Switch to Committees' : 'Switch to Candidates'}
          </button>
        </div>
        <button onSubmit={props.search} className="btn btn-success">Search</button>
      </form>
    </div>
  );
}

InputGroup.propTypes = {
  candidateSearch: PropTypes.bool.isRequired,
  switchMode: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};
