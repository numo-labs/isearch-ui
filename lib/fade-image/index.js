'use strict';
import React, { Component, PropTypes } from 'react';
import './styles.css';

export default class FadeImage extends Component {
  constructor () {
    super();
    this.state = {
      loaded: false
    };
  }
  componentDidMount () {
    this.setState({ loaded: true });
  }
  componentWillUnMount () {
    this.setState({ loaded: false });
  }
  render () {
    const loadingClass = this.state.loaded ? 'image-loaded' : false;
    if (this.props.isBackground) {
      return (
          <div {...this.props} className={`image ${loadingClass} ${this.props.className}`} style={{backgroundImage: `url(${this.props.src})`}}/>
      );
    }
    return (
      <img {...this.props} className={`image ${loadingClass} ${this.props.className}`}/>
    );
  }
}

FadeImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  isBackground: PropTypes.bool
};
