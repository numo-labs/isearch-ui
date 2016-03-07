import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class SearchTile extends Component {
  render () {
    return (
      <div style={{backgroundImage: 'url(\"' + this.props.backgroundImage +'\")'}} className={'tile ' + 'tile' + this.props.height}>
        <div>{this.props.title}</div>
      </div>
    );
  }
}

SearchTile.propTypes = {
  title: PropTypes.string,
  height: PropTypes.number,
  backgroundImage: PropTypes.string
};
