import React, { PropTypes, Component } from 'react';

export default class SearchTile extends Component {
  render () {
    return (
      <div style={{ borderColor: 'red' }}>{this.props.title}</div>
    );
  }
}

SearchTile.propTypes = {
  title: PropTypes.string.isRequired
};
