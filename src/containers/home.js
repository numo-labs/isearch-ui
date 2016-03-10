import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/home/';
import * as HomeActions from '../actionCreators/home.js';

class HomeContainer extends Component {
  render () {
    const { addMessageVisible, showAddMessage, hideAddMessage } = this.props;
    return (<Home
      addMessageVisible={addMessageVisible}
      showAddMessage={showAddMessage}
      hideAddMessage={hideAddMessage}
    />);
  }
}

HomeContainer.propTypes = {
  addMessageVisible: PropTypes.string,
  showAddMessage: PropTypes.func,
  hideAddMessage: PropTypes.func
};

function mapStateToProps (state) {
  return ({
    addMessageVisible: state.home.addMessageVisible
  });
}

export default connect(mapStateToProps, HomeActions)(HomeContainer);
