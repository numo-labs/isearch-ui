import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Filter from 'filter';
import * as FilterActions from '../actionCreators/filter.js';

class FilterContainer extends Component {
  render () {
    const { yesFilter, noFilter, filterVisible, addMessageVisible } = this.props;
    return (<Filter
      yesFilter={yesFilter}
      noFilter={noFilter}
      filterVisible={filterVisible}
      addMessageVisible={addMessageVisible}
      />);
  }
}

FilterContainer.propTypes = {
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filterVisible: PropTypes.boolean
};

function mapStateToProps (state) {
  return ({
    filterVisible: state.filter.filterVisible
  });
}

export default connect(mapStateToProps, FilterActions)(FilterContainer);
