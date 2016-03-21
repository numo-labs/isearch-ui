import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// components
import Home from '../components/home/';

// actions
import * as HomeActions from '../actionCreators/home.js';
import * as SearchResultActions from '../actionCreators/search-results';

const ActionCreators = {...HomeActions, ...SearchResultActions};

class HomeContainer extends Component {
  render () {
    const { addMessageVisible,
      hideAddMessage,
      fetchQuerySearchResults,
      loading,
      items
    } = this.props;
    console.log('home container items', items);
    return (<Home
      addMessageVisible={addMessageVisible}
      hideAddMessage={hideAddMessage}
      fetchQuerySearchResults={fetchQuerySearchResults}
      loading={loading}
      items={items}
    />);
  }
}

HomeContainer.propTypes = {
  // actions
  addMessageVisible: PropTypes.bool,
  hideAddMessage: PropTypes.func,
  fetchQuerySearchResults: PropTypes.func,
  loading: PropTypes.bool,
  items: PropTypes.array
};

function mapStateToProps (state) {
  const { home: { addMessageVisible }, search: { loading, items } } = state;
  return {
    addMessageVisible,
    loading,
    items
  };
}

export default connect(mapStateToProps, ActionCreators)(HomeContainer);
