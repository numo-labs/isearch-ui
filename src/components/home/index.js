import React, { PropTypes, Component } from 'react';

export default class Home extends Component {

  render () {
    return (
      <div>{this.props.name}</div>
    );
  }
}

Home.propTypes = {
  name: PropTypes.string.isRequired
};
