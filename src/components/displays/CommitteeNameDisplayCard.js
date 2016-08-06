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
    return committeesById[id].committeeList.map((committee, index) => {
      return (
        <CandidateByCommitteeCard
          key={index}
          candidateName={name}
          committeeId={committee.committee_id}
          candidateId={committee.candidate_id}
          committeeName={committee.committee_name}
          count={committee.count}
          total={committee.total}
          cycle={committee.cycle}
          supportOppose={supportOppose[committee.support_oppose_indicator]}
          />
      );
    });
  }

  render() {
    const { id, committeeName, committeesById } = this.props
    let list;
    if (this.state.showDetails && committeesById.hasOwnProperty(id)) list = this.createList();
    const noData = <p>No Data Found<p>;
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
          {(list.length < 1) ?
            noData : list
          }
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
