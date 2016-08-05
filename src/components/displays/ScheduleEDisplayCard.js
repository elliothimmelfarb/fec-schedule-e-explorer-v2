import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export default (props) => {
  const {
    pdf_url,
    expenditure_date,
    expenditure_amount,
    expenditure_description,
  } = props.data;
  return (
    <div className="jumbotron">
    <div className="container row">
      <div className="col-xs-12">
        <p>Desctiption: {expenditure_description}</p>
      </div>
    </div>
      <div className="container row">
        <div className="col-xs-4">
          <span>
            <a href={pdf_url}>View Filing PDF</a>
          </span>
        </div>
        <div className="col-xs-4">
          <p>{expenditure_date}</p>
        </div>
        <div className="col-xs-4">
          <p>${expenditure_amount}</p>
        </div>
      </div>
    </div>
  )
}
