import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// components
import Grid from '../components/grid/index.js';

// actions
import * as GridActions from '../actionCreators/home.js';
import * as FilterActions from '../actionCreators/filter.js';
const ActionCreators = {...GridActions, ...FilterActions};

class GridContainer extends Component {
  render () {
    const { showAddMessage, yesFilter, noFilter, filters, items } = this.props;
    return (<Grid
      showAddMessage={showAddMessage}
      yesFilter={yesFilter}
      noFilter={noFilter}
      filters={filters}
      items={items}
    />);
  }
}

GridContainer.propTypes = {
  // actions
  showAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,

  // store
  filters: PropTypes.object,
  items: PropTypes.array,
  // from parent component
  tileData: PropTypes.object
};

function mapStateToProps (state) {
  const { filter: { filters } } = state;
  return {
    filters
  };
}

export default connect(mapStateToProps, ActionCreators)(GridContainer);