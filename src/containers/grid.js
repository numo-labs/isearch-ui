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
    const { showAddMessage, yesFilter, noFilter, filters, tileData } = this.props;
    return (<Grid
      showAddMessage={showAddMessage}
      yesFilter={yesFilter}
      noFilter={noFilter}
      filters={filters}
      tileData={tileData}
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

  // from parent component
  tileData: PropTypes.object
};

function mapStateToProps (state) {
  const { filter: { filters }, search: { items } } = state;
  return {
    filters,
    items
  };
}

export default connect(mapStateToProps, ActionCreators)(GridContainer);
