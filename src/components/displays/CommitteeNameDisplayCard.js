import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function CommitteeNameDisplayCard({
  name,
}) {
  return (
    <div className="jumbotron">
      <div className="container row">
        <div className="col-xs-12">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}

CommitteeNameDisplayCard.propTypes = {
  name: PropTypes.string,
};

export default CommitteeNameDisplayCard;
