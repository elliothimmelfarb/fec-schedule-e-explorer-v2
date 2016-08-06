import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { format } from 'currency-formatter'
import { getScheduleEFilingsByCommittee } from '../../actions/candidateActions';
import ScheduleEDisplayCard from './ScheduleEDisplayCard';

const style = {
  jumbotron: {
    padding: '40px 20px',
    paddingBottom: '10px',
    backgroundColor: 'rgb(179, 180, 193)',
  },
  button: {
    marginTop: '30px',
    marginBottom: '15px',
    backgroundColor: 'rgb(98, 140, 203)',
  },
  text: {
    fontSize: '30px',
  },
  col: {
    textAlign: 'center',
  },
  row: {
    margin: '0 auto'
  },
  suppOpp: {
    marginBottom: '10px',
  }
}


class CommitteeByCandidateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }
  }

  toggleDetails() {
    const { candidateId, committeeId, getDetails, candidatesById  } = this.props;
    if (!candidatesById[candidateId].hasOwnProperty('SchedEByCommittee'))
      getDetails(committeeId, candidateId);
    this.setState({ showDetails: !this.state.showDetails });
  }

  createList() {
    const { candidateId, candidatesById, committeeId } = this.props;
    const supportOppose = {
      "O": "Opposing",
      "S": "Supporting",
    }
    return candidatesById[candidateId].schedEByCommitteeList[committeeId].map((schedE, index) => {
      const data = {
        pdf_url: schedE.pdf_url,
        expenditure_date: schedE.expenditure_date,
        expenditure_amount: schedE.expenditure_amount,
        expenditure_description: schedE.expenditure_description,
        support_oppose_indicator: supportOppose[schedE.support_oppose_indicator],
        candidate_name: schedE.candidate_name,
        committee_name: schedE.committee.name,
      }
      return (
        <ScheduleEDisplayCard
          key={index}
          data={data}
        />
      );
    });
  }

  render() {
    const { candidateName, committeeId, candidateId, candidatesById, committeeName, count, total, supportOppose } = this.props
    let list = '';
    const formattedTotal = format(total, { code: 'USD' });
    if (this.state.showDetails
      && candidatesById[candidateId].hasOwnProperty('schedEByCommitteeList')
      && candidatesById[candidateId].schedEByCommitteeList.hasOwnProperty(committeeId)) {
        list = this.createList();
      }
    return (
      <div style={style.jumbotron} className="jumbotron">
        <div style={style.row} className="container row">
          <div style={style.col} className="col-xs-6">
            <p>{committeeName}</p>
          </div>
          <div style={style.col} className="col-xs-2">
            <p style={style.suppOpp}>{supportOppose}</p>
            {candidateName}
          </div>
          <div style={style.col} className="col-xs-2">
            Total Filings:
            <p>{count}</p>
          </div>
          <div style={style.col} className="col-xs-2">
            Total Spent:
            <p>{formattedTotal}</p>
          </div>
        </div>
        <button style={style.button} onClick={() => this.toggleDetails()} className="btn btn-info form-control">
          {!this.state.showDetails ? 'Show Individual Filings' : 'Hide Individual Filings'}
        </button>
        <div>
          {list}
        </div>
      </div>
    );
  }
}

CommitteeByCandidateCard.propTypes = {
  committeeId: PropTypes.string,
  candidateId: PropTypes.string,
  committeeName: PropTypes.string,
  count: PropTypes.number,
  total: PropTypes.number,
  supportOppose: PropTypes.string,
  candidatesById: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    candidatesById: state.candidates.candidatesById,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: (committeeId, candidateId) => dispatch(getScheduleEFilingsByCommittee(committeeId, candidateId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeByCandidateCard);
