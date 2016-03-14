import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Grid from '../components/grid/';
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
  showAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filters: PropTypes.boolean
};

function mapStateToProps (state) {
  const { filter: { filters } } = state;
  return {
    filters
  };
}

export default connect(mapStateToProps, ActionCreators)(GridContainer);
