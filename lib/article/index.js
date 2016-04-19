import React, { Component, PropTypes } from 'react';
import ArticleFooter from './article-footer.js';
import NavHeader from '../nav-header/';

require('./style.css');

function moveScrollToTop (w = window) {
  w.scrollTo(0, 0);
}

export class ArticleTile extends Component {
  render () {
    return (
        <div className='articleContainer'
          onClick={ () => {
            moveScrollToTop(this.props.window);
            this.props.viewArticle(this.props.content);
          }}
        >
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

export class ArticleFullPage extends Component {
  render () {
    const { articleContent, backToSearch } = this.props;
    return (
      <section>
        <NavHeader backToSearch={backToSearch} />
        <div className='articleFullPageContainer'>
          { articleContent.sections.map((section, key) => {
            return (
              <div key={key} className='articleSection'>
                {section.image ? <img className='articleImage' src={section.image} /> : null}
                {section.title ? (key === 0 ? <h1>{section.title}</h1> : <h2 >{section.title}</h2>) : null}
                {section.text ? <p className='articleText'>{section.text}</p> : null}
              </div>
            );
          })}
        </div>
        <ArticleFooter />
      </section>
    );
  }
}

ArticleFullPage.propTypes = {
  articleContent: PropTypes.object,
  backToSearch: PropTypes.func
};

ArticleTile.propTypes = {
  window: PropTypes.object,
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.object,
  viewArticle: PropTypes.func
};
