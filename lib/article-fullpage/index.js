import React, { Component, PropTypes } from 'react';

require('./style.css');

export default class ArticleFullPage extends Component {
  render () {
    const { articleContent } = this.props;
    return (
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
    );
  }
}

ArticleFullPage.propTypes = {
  articleContent: PropTypes.object
};
