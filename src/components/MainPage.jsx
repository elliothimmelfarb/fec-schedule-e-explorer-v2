import React from 'react';
import { connect } from 'react-redux';
import courseActions from '../actions/courseActions';


class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Hey t here</h1>
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
