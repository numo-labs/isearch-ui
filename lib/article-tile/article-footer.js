import React, { PropTypes, Component } from 'react';
import Footer from '../footer/';

require('./article-footer-style.css');

export default class ArticleFooter extends Component {
  render () {
    return (
      <Footer className='articleFooter'>
        <div className='tagLabel'>{this.props.articleName}</div>
        <div className='addTagButton' onClick={this.props.onAddTagClick}>+</div>
      </Footer>
    );
  }
}

ArticleFooter.propTypes = {
  onAddTagClick: PropTypes.func,
  articleName: PropTypes.string
};
