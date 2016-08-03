import React from 'react';
import { connect } from 'react-redux';
import SearchArea from './search/searchArea';

const style = {
  maxWidth: 1000,
  margin: '0 auto',
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={style}>
        <SearchArea />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.data,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     createCourse: course => dispatch(CourseActions.createCourse(course))
//   }
// }

export default connect(mapStateToProps)(MainPage);
