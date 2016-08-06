import React, { PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';

const style = {
  navRight: {
    marginRight: '10px',
  },
  nav: {
    border: '1px solid rgb(156, 156, 156)',
    boxShadow: '-6px 10px 16px -9px #3c3c3c',
  },
  brand: {
    fontSize: '2em',
    fontWeight: '700',
  },
};

const Header = () => (
  <nav style={style.nav} className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a
          style={style.brand}
          className="navbar-brand"
          href="https://github.com/elliothimmelfarb/fec-schedule-e-explorer-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Federal Election Committee Schedule E Filings Explorer</p>
        </a>
      </div>
      <p style={style.navRight} className="navbar-text navbar-right">
        Created by <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://http://futurecode.ninja/"
          className="navbar-link"
        >
          Elliot Himmelfarb
        </a> using React, Redux, and the <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://api.open.fec.gov/developers/"
          className="navbar-link"> OpenFEC.gov API
        </a>
      </p>
    </div>
  </nav>
);


export default Header;
