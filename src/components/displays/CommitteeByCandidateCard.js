import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getScheduleEFilingsByCommittee } from '../../actions/candidateActions';
import ScheduleEDisplayCard from './ScheduleEDisplayCard';

const style = {
  jumbotron: {
    backgroundColor: 'rgb(179, 180, 193)',
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
    return candidatesById[candidateId].schedEByCommitteeList[committeeId].map((schedE, index) => {
      const data = {
        pdf_url: schedE.pdf_url,
        expenditure_date: schedE.expenditure_date,
        expenditure_amount: schedE.expenditure_amount,
        expenditure_description: schedE.expenditure_description,
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
    const { committeeId, candidateId, candidatesById, committeeName, count, total, supportOppose } = this.props
    let list = '';
    if (this.state.showDetails
      && candidatesById[candidateId].hasOwnProperty('schedEByCommitteeList')
      && candidatesById[candidateId].schedEByCommitteeList.hasOwnProperty(committeeId)) {
        list = this.createList();
      }
    return (
      <div style={style.jumbotron} className="jumbotron">
        <div className="container row">
          <div className="col-xs-5">
            <p>{committeeName}</p>
          </div>
          <div className="col-xs-2">
            Total Filings:
            <p>{count}</p>
          </div>
          <div className="col-xs-2">
            <p>{supportOppose}</p>
          </div>
          <div className="col-xs-3">
            Total Spent:
            <p>${total}</p>
          </div>
        </div>
        <button onClick={() => this.toggleDetails()} className="btn btn-info form-control">
          {this.state.showDetails ? 'Close' : 'Expand'}
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
