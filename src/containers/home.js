import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// components
import Home from '../components/home/';

// actions
import * as HomeActions from '../actionCreators/home.js';

class HomeContainer extends Component {
  render () {
    const { addMessageVisible,
      hideAddMessage,
      fetchQuerySearchResults,
      loading
    } = this.props;
    return (<Home
      addMessageVisible={addMessageVisible}
      hideAddMessage={hideAddMessage}
      fetchQuerySearchResults={fetchQuerySearchResults}
      loading={loading}
    />);
  }
}

HomeContainer.propTypes = {
  // actions
  addMessageVisible: PropTypes.bool,
  hideAddMessage: PropTypes.func,
  fetchQuerySearchResults: PropTypes.func,
  loading: PropTypes.bool
};

function mapStateToProps (state) {
  const { home: { addMessageVisible, loading } } = state;
  return {
    addMessageVisible,
    loading
  };
}

export default connect(mapStateToProps, HomeActions)(HomeContainer);
