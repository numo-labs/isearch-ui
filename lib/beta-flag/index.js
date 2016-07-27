import React, { Component, PropTypes } from 'react';
require('./style.css');

export default class BetaFlag extends Component {
  render () {
    let className = this.props.top ? 'betaFlagTop' : 'betaFlagBar';
    return (
        <div className={className}><p className={"betaText"}>BETA</p></div>
    );
  }
}

BetaFlag.propTypes = {
  top: PropTypes.bool
};

export default BetaFlag;
