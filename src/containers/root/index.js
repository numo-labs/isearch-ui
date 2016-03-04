import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';

export default class Root extends Component {

  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div>hello</div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
