import React, { Component } from 'react';
import Footer from '../footer/';

require('./article-footer-style.css');

export default class ArticleFooter extends Component {
  render () {
    return (
        <Footer className='articleFooter'>
          <a className='bookLink' href='#'>BOOK VACATION</a>
        </Footer>
    );
  }
}
