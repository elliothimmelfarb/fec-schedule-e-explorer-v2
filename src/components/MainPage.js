import React from 'react';
import { connect } from 'react-redux';
import SearchArea from './search/searchArea';
import NameListDisplay from './displays/NameListDisplay';

const style = {
  maxWidth: 1500,
  margin: '0 auto',
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={style}>
        <SearchArea />
        <NameListDisplay />
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return {
//     nameSearched: state.nameSearch.hasSearched,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     createCourse: course => dispatch(CourseActions.createCourse(course))
//   }
// }

export default connect()(MainPage);
