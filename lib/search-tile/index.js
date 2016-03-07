import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class SearchTile extends Component {
  render () {
    return (
      <div className={'tile ' + 'tile' + this.props.height}>
        <div>{this.props.title}</div>
      </div>
    );
  }
}

SearchTile.propTypes = {
  title: PropTypes.string,
  height: PropTypes.number
};
