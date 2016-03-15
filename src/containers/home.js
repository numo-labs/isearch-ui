import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// components
import Home from '../components/home/';

// actions
import * as HomeActions from '../actionCreators/home.js';

class HomeContainer extends Component {
  render () {
    const { addMessageVisible, hideAddMessage } = this.props;
    return (<Home
      addMessageVisible={addMessageVisible}
      hideAddMessage={hideAddMessage}
    />);
  }
}

HomeContainer.propTypes = {
  // actions
  addMessageVisible: PropTypes.bool,
  hideAddMessage: PropTypes.func
};

function mapStateToProps (state) {
  const { home: { addMessageVisible } } = state;
  return {
    addMessageVisible
  };
}

export default connect(mapStateToProps, HomeActions)(HomeContainer);
