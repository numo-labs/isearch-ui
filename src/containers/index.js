import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

// container
import ISearch from './isearch';

export default class Root extends Component {

  render () {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <ISearch />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
