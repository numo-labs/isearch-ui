import React, { PropTypes, Component } from 'react';

export default class SearchTile extends Component {
  render () {
    return (
      <div>{this.props.title}</div>
    );
  }
}

SearchTile.propTypes = {
  title: PropTypes.string.isRequired
};
