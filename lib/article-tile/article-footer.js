import React, { PropTypes, Component } from 'react';
import Footer from '../footer/';

require('./article-footer-style.css');

export default class ArticleFooter extends Component {
  render () {
    return (
      <Footer className='articleFooter'>
        <a className='bookLink' href='#' onClick={this.props.onAddTagClick}>ADD TAG</a>
      </Footer>
    );
  }
}

ArticleFooter.propTypes = {
  onAddTagClick: PropTypes.func
};
