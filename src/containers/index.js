import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

// container
// import ISearch from './isearch';
import ISearchRouter from '../routes';

export default class Root extends Component {

  render () {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <ISearchRouter />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
