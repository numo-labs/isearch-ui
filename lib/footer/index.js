import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class Footer extends Component {
  render () {
    return (
        <div className={'footer ' + this.props.className}>
          {this.props.children}
        </div>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object
};
