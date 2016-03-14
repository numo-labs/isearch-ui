import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Grid from '../components/grid/';
import * as GridActions from '../actionCreators/home.js';
import * as FilterActions from '../actionCreators/filter.js';
const ActionCreators = {...GridActions, ...FilterActions};

class GridContainer extends Component {
  render () {
    const { showAddMessage, yesFilter, noFilter, filterVisible, tileData } = this.props;
    return (<Grid
      showAddMessage={showAddMessage}
      yesFilter={yesFilter}
      noFilter={noFilter}
      filterVisible={filterVisible}
      tileData={tileData}
    />);
  }
}

GridContainer.propTypes = {
  showAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filterVisible: PropTypes.boolean
};

function mapStateToProps (state) {
  const { filter: { filterVisible } } = state;
  return {
    filterVisible
  };
}

export default connect(mapStateToProps, ActionCreators)(GridContainer);
