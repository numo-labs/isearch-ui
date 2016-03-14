import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/home/';
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
  addMessageVisible: PropTypes.string,
  hideAddMessage: PropTypes.func
};

function mapStateToProps (state) {
  const { home: { addMessageVisible } } = state;
  return {
    addMessageVisible
  };
}

export default connect(mapStateToProps, HomeActions)(HomeContainer);
