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
  const {
    filter: {
      showAddMessage,
      hideAddMessage,
      yesFilter,
      noFilter,
      filterVisible
    },
    home: {
      addMessageVisible
    }
  } = state;
  return {
    addMessageVisible,
    showAddMessage,
    hideAddMessage,
    yesFilter,
    noFilter,
    filterVisible
  };
}

export default connect(mapStateToProps, ActionCreators)(HomeContainer);
