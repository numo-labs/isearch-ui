import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class Article extends Component {
  render () {
    return (
        <div className='articleContainer'>
          <img className='articleImage' src={this.props.backgroundImage} />
          <div className='type'>
            <h5>{this.props.type}</h5>
          </div>
          <div className='text'>
            <h4>{this.props.overview}</h4>
            <h1>{this.props.title}</h1>
          </div>
        </div>
    );
  }
}

Article.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  type: PropTypes.string
};
