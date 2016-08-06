import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CandidateByCommitteeCard from './CandidateByCommitteeCard';
import { getCandidatesByCommittee } from '../../actions/committeeActions';


const style = {
  jumbotron: {
    padding: '40px 20px',
    paddingBottom: '10px',
  },
  button: {
    marginTop: '30px',
    marginBottom: '15px',
    backgroundColor: 'rgb(124, 175, 121)',
  },
  text: {
    fontSize: '30px',
  },
  col: {
    textAlign: 'center',
    width: '100%',
  },
  row: {
    margin: '0 auto',
    width: '100%',
  },
}


class CommitteeNameDisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }
  }

  toggleDetails() {
    const { id, getDetails, committeesById } = this.props;
    if (!committeesById.hasOwnProperty(id)) getDetails(id);
    this.setState({ showDetails: !this.state.showDetails });
  }

  createList() {
    const supportOppose = {
      "O": "Opposing",
      "S": "Supporting",
    }
    const { id, committeesById } = this.props;
    return committeesById[id].candidateList.map((candidate, index) => {
      return (
        <CandidateByCommitteeCard
          key={index}
          candidateName={candidate.candidate_name}
          committeeId={candidate.committee_id}
          candidateId={candidate.candidate_id}
          committeeName={candidate.committee_name}
          count={candidate.count}
          total={candidate.total}
          cycle={candidate.cycle}
          supportOppose={supportOppose[candidate.support_oppose_indicator]}
          />
      );
    });
  }

  render() {
    const { id, committeeName, committeesById } = this.props
    let list;
    if (this.state.showDetails && committeesById.hasOwnProperty(id)) {
      list = this.createList();
      if (list.length < 1) list = (<p>Information Missing</p>)
    }
    return (
      <div style={style.jumbotron} className="jumbotron">
        <div style={style.row} className="container row">
          <div style={style.col} className="col-xs-12">
            <p style={style.text}>{committeeName}</p>
          </div>
        </div>
        <button style={style.button} onClick={() => this.toggleDetails()} className="btn btn-info form-control">
          {this.state.showDetails ? 'Hide Candidates with filings by this Committee' : 'Show Candidates with filings by this Committee'}
        </button>
        <div>
          {list}
        </div>
      </div>
    );
  }
}

CommitteeNameDisplayCard.propTypes = {
  name: PropTypes.string,
  committeesById: PropTypes.object,
  id: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    committeesById: state.committees.committeesById,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: (id) => dispatch(getCandidatesByCommittee(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeNameDisplayCard);
