import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

// container
import Home from './home.js';

export default class Root extends Component {

  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
