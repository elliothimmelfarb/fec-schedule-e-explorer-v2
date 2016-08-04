import React, { PropTypes } from 'react';
import Header from './common/Header';

const style = {
  textAlign: 'center',
};

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
