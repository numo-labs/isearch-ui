import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/home/';
import * as HomeActions from '../actionCreators/home.js';
import * as FilterActions from '../actionCreators/filter.js';
const ActionCreators = {...HomeActions, ...FilterActions};

class HomeContainer extends Component {
  render () {
    const { addMessageVisible, showAddMessage, hideAddMessage, yesFilter, noFilter, filterVisible } = this.props;
    return (<Home
      addMessageVisible={addMessageVisible}
      showAddMessage={showAddMessage}
      hideAddMessage={hideAddMessage}
      yesFilter={yesFilter}
      noFilter={noFilter}
      filterVisible={filterVisible}
    />);
  }
}

HomeContainer.propTypes = {
  addMessageVisible: PropTypes.string,
  showAddMessage: PropTypes.func,
  hideAddMessage: PropTypes.func,
  yesFilter: PropTypes.func,
  noFilter: PropTypes.func,
  filterVisible: PropTypes.boolean
};

function mapStateToProps (state) {
  return ({
    addMessageVisible: state.home.addMessageVisible,
    showAddMessage: state.filter.showAddMessage,
    hideAddMessage: state.filter.hideAddMessage,
    yesFilter: state.filter.yesFilter,
    noFilter: state.filter.noFilter,
    filterVisible: state.filter.filterVisible
  });
}

export default connect(mapStateToProps, ActionCreators)(HomeContainer);
