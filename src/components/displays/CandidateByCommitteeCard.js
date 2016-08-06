import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { format } from 'currency-formatter'
import { getScheduleEFilingsByCandidate } from '../../actions/committeeActions';
import ScheduleEDisplayCard from './ScheduleEDisplayCard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const style = {
  jumbotron: {
    padding: '40px 20px',
    paddingBottom: '10px',
    backgroundColor: 'rgb(195, 197, 217)',
    marginBottom: '10px',
    border: '1px solid rgb(171, 171, 171)',
    marginRight: '20px',
    marginLeft: '20px',
  },
  button: {
    marginBottom: '10px',
    backgroundColor: 'rgb(98, 140, 203)',
  },
  text: {
    fontSize: '30px',
  },
  col: {
    textAlign: 'center',
  },
  row: {
    margin: '0 auto',
  },
  topRow: {
    marginBottom: '30px',
    margin: '0 auto',
  },
  suppOpp: {
    marginBottom: '10px',
  }
}


class CandidateByCommitteeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }
  }

  toggleDetails() {
    const { candidateId, committeeId, getDetails, committeesById  } = this.props;
    console.log(committeesById[committeeId].hasOwnProperty('SchedEByCandidateList'))
    if (!committeesById[committeeId].hasOwnProperty('SchedEByCandidateList'))
      getDetails(committeeId, candidateId);
    this.setState({ showDetails: !this.state.showDetails });
  }

  createList() {
    const { candidateId, committeesById, committeeId } = this.props;
    const supportOppose = {
      "O": "Opposing",
      "S": "Supporting",
    }
    return committeesById[committeeId].schedEByCandidateList[candidateId].map((schedE, index) => {
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
    const { candidateName, committeeId, candidateId, committeesById, committeeName, count, total, supportOppose } = this.props
    let list = '';
    const formattedTotal = format(total, { code: 'USD' });
    if (this.state.showDetails
      && committeesById[committeeId].hasOwnProperty('schedEByCandidateList')
      && committeesById[committeeId].schedEByCandidateList.hasOwnProperty(candidateId)) {
        list = this.createList();
      }
    return (
      <div style={style.jumbotron} className="jumbotron">
        <div style={style.topRow} className="container row">
          <div style={style.col} className="col-xs-5">
            <p>{candidateName || 'Information Missing'}</p>
          </div>
          <div style={style.col} className="col-xs-2">
            <p style={style.suppOpp}>{supportOppose || 'Not Declared'}</p>
          </div>
          <div style={style.col} className="col-xs-3">
            Total Filings:
            <p>{count}</p>
          </div>
          <div style={style.col} className="col-xs-2">
            Total Spent:
            <p>{formattedTotal}</p>
          </div>
        </div>
        <div className="row">
          <div style={style.col} className="col-xs-12">
            {committeeName}
          </div>
        </div>
        <hr/>
        <button style={style.button} onClick={() => this.toggleDetails()} className="btn btn-info form-control">
          {!this.state.showDetails ? 'Show Individual Filings' : 'Hide Individual Filings'}
        </button>
        <div>
          <ReactCSSTransitionGroup transitionName="cards" transitionEnterTimeout={400} transitionLeaveTimeout={200}>
            {list}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

CandidateByCommitteeCard.propTypes = {
  committeeId: PropTypes.string,
  candidateId: PropTypes.string,
  committeeName: PropTypes.string,
  count: PropTypes.number,
  total: PropTypes.number,
  supportOppose: PropTypes.string,
  committeesById: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    committeesById: state.committees.committeesById,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: (committeeId, candidateId) => dispatch(getScheduleEFilingsByCandidate(committeeId, candidateId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateByCommitteeCard);
