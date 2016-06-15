import React, { PropTypes, Component } from 'react';
import Footer from '../footer/';

require('./article-footer-style.css');

export default class ArticleFooter extends Component {
  render () {
    let { articleName } = this.props;
    if (window.innerWidth < 325) {
      if (articleName.length > 33) {
        articleName = articleName.split('').slice(0, 33).join('') + '...';
      }
    }
    if (window.innerWidth < 376) {
      if (articleName.length > 41) {
        articleName = articleName.split('').slice(0, 41).join('') + '...';
      }
    }
    return (
      <Footer className='articleFooter'>
        <div className='tagLabel'>{articleName}</div>
        <div className='addTagButton' onClick={this.props.onAddTagClick}>+</div>
      </Footer>
    );
  }
}

ArticleFooter.propTypes = {
  onAddTagClick: PropTypes.func,
  articleName: PropTypes.string
};
