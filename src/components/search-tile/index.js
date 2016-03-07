import React, { PropTypes, Component } from 'react';

require('./style.css');
export default class SearchTile extends Component {
  render () {
    return (
      <div className={'tile ' + 'tile' + this.props.width}>{this.props.title}</div>
    );
  }
}

SearchTile.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string
};
