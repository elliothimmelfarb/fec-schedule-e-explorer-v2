import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CommitteeByCandidateCard from './CommitteeByCandidateCard';
import { getCommitteesByCandidate } from '../../actions/candidateActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const style = {
  jumbotron: {
    padding: '40px 20px',
    paddingBottom: '10px',
    marginBottom: '10px',
    border: '1px solid rgb(171, 171, 171)',
  },
  button: {
    marginBottom: '15px',
    backgroundColor: 'rgb(124, 175, 121)',
  },
  text: {
    fontSize: '30px',
    fontWeight: '400',
  },
  col: {
    textAlign: 'center',
  },
  row: {
    margin: '0 auto'
  }
}


class CandidateNameDisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }
  }

  toggleDetails() {
    const { id, getDetails, candidatesById } = this.props;
    if (!candidatesById.hasOwnProperty(id)) getDetails(id);
    this.setState({ showDetails: !this.state.showDetails });
  }

  createList() {
    const supportOppose = {
      "O": "Opposing",
      "S": "Supporting",
    }
    const { id, candidatesById, name } = this.props;
    return candidatesById[id].committeeList.map((committee, index) => {
      return (
        <CommitteeByCandidateCard
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
    const { id, name, office, candidatesById } = this.props
    let list;
    if (this.state.showDetails && candidatesById.hasOwnProperty(id)) {
      list = this.createList();
      if (list.length < 1) list = (<p>No Schedule E Filings</p>);
    }
    return (
      <div style={style.jumbotron} className="jumbotron">
        <div style={style.row} className="container row">
          <div style={style.col} className="col-xs-6">
            <p style={style.text}>{name}</p>
          </div>
          <div style={style.col} className="col-xs-6">
            <p style={style.text}>Office Sought: {office}</p>
          </div>
        </div>
        <hr/>
        <button style={style.button} onClick={() => this.toggleDetails()} className="btn btn-info form-control">
          {this.state.showDetails ? 'Hide Committees with Filings Related to this Candidate Seeking this Office' : 'Show Committees with Filings Related to this Candidate Seeking this Office'}
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

CandidateNameDisplayCard.propTypes = {
  name: PropTypes.string,
  office: PropTypes.string,
  candidatesById: PropTypes.object,
  id: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    candidatesById: state.candidates.candidatesById,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: (id) => dispatch(getCommitteesByCandidate(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateNameDisplayCard);
