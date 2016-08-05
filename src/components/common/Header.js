import React, { PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';

const style = {
  // backgroundColor: 'gray',
};

const Header = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">
          <p>FEC schedule E Filings Explorer</p>
        </a>
      </div>
      <p className="navbar-text navbar-right">
        created by:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/elliothimmelfarb/fec-schedule-e-explorer-v2"
          className="navbar-link"
        >
          Elliot Himmelfarb
        </a>
      </p>
    </div>
  </nav>
);


export default Header;
