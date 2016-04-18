import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class ArticleFooter extends Component {
  render () {
    return (
        <div className='articleFooter'>
          <a className='bookLink' href='#'>BOOK VACATION</a>
        </div>
    );
  }
}

ArticleFooter.propTypes = {
  articleContent: PropTypes.object
};
