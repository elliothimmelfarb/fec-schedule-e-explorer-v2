import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { format } from 'currency-formatter'

const style = {
  jumbotron: {
    padding: '40px 20px',
    paddingBottom: '10px',
    backgroundColor: 'rgb(231, 235, 255)',
    marginBottom: '10px',
    border: '1px solid rgb(107, 107, 107)',
    marginRight: '20px',
    marginLeft: '20px',
  },
  button: {
    marginTop: '30px',
    marginBottom: '15px',
    backgroundColor: 'rgb(98, 140, 203)',
  },
  col: {
    textAlign: 'center',
  },
  row: {
    margin: '0 auto',
    top: {
      position: 'relative',
      bottom: '20px',
      margin: '0 auto',
    }
  },
  suppOpp: {
    marginBottom: '5px',
  },
  description: {
    fontSize: '30px',
  },
  bottomLink: {
    marginTop: '20px',
    fontSize: '20px',
  },
}

export default (props) => {
  const {
    pdf_url,
    expenditure_date,
    expenditure_amount,
    expenditure_description,
    support_oppose_indicator,
    candidate_name,
    committee_name
  } = props.data;
  return (
    <div style={style.jumbotron} className="jumbotron">
      <div style={style.row} style={style.row.top} className="container row">
        <div style={style.col}  className="col-xs-12">
          Filing Description:
          <p style={style.description}>{expenditure_description}</p>
        </div>
      </div>
      <div style={style.row} className="container row">
        <div className="col-xs-4">
          Filing Date:
          <p>{expenditure_date}</p>
        </div>
        <div className="col-xs-4">
          <p>{format(expenditure_amount, { code: 'USD' })}</p>
        </div>
        <div className="col-xs-4">
          <p>{support_oppose_indicator} {candidate_name}</p>
        </div>
      </div>
      <hr/>
      <div style={style.row} className="container row">
        <div className="col-xs-12">
          <span>
            {committee_name}
          </span>
        </div>
      </div>
      <div style={style.row} className="container row">
        <div style={style.bottomLink} className="col-xs-12">
          <span>
            <a target="_blank" href={pdf_url}>View Filing PDF</a>
          </span>
        </div>
      </div>
    </div>
  )
}
