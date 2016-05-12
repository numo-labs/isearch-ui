import React, { Component, PropTypes } from 'react';
import ArticleFooter from './article-footer.js';
import NavHeader from '../nav-header/';
import Tag from '../tags/tag.js';

require('./style.css');

function moveScrollToTop (w = window) {
  w.scrollTo(0, 0);
}

export class ArticleTile extends Component {
  render () {
    const { tile } = this.props;
    return (
        <div className='articleContainer'
          onClick={ () => {
            this.props.viewArticle(tile);
          }}
        >
          <img className='articleImage' src={tile.sections && tile.sections[0].image} />
          <div className='type'>
            <h5>{tile.type}</h5>
          </div>
          <div className='text'>
            <h4>{this.props.overview}</h4>
            <h2>{tile.name}</h2>
          </div>
        </div>
    );
  }
}

export class ArticleFullPage extends Component {

  handleOnAddTagClick () {
    this.props.onAddArticleTag(this.props.articleContent.name, this.props.articleContent.id);
    this.props.backToSearch();
  }

  render () {
    const { articleContent, backToSearch } = this.props;
    const tagColours = {
      amenities: 'rgba(12,125,125,0.6)',
      geo: 'rgba(12,125,12,0.6)'
    };

    /**
     * Render tags if exist.
     * @param  {[object]} tags    array of tag objects with 'value' and 'label'
     * @param  {string} tagsType  name of the tags type (amenities or geo for now)
     * @return {reactcomponent}   rendered tags
     */
    function renderTags (tags, tagsType) {
      if (tags && tags.length > 0) {
        tags.map((tag, key) => {
          return (
            <Tag key={key} displayName={tag.label} colour={tagColours[tagsType]} removeTag={() => {}}/>
          );
        });
      }
    }
    const introSection = articleContent.sections[0];
    const content = articleContent.sections.slice(1);
    return (
      <section>
        <NavHeader backToSearch={backToSearch} />
        <div className='articleFullPageContainer'>
          <div className='articleHeaderImage' style={{backgroundImage: `url(${introSection.image})`}} />
          <div className='articleContentContainer'>
            <section>
              <div className='articleSection'>
                <div className='articleHeader'>{introSection.title}</div>
                {introSection.text ? <p className='articleIntroText'>{introSection.text}</p> : null}
              </div>
            </section>
            {content.map((section, key) => {
              return (
                <section>
                  <div key={key} className='articleSection'>
                    {section.image ? <div className='articleImage' style={{backgroundImage: `url(${section.image})`}}> <img src={section.image}/> </div> : null}
                    {section.title ? <div className='articleSectionHeading' >{section.title}</div> : null}
                    {section.text ? <p className='articleText'>{section.text}</p> : null}
                  </div>
                </section>
              );
            })}
            {
              (articleContent.geo || articleContent.amenities) &&
                <div className='tagSection'>
                  {renderTags(articleContent.geo, 'geo')}
                  {renderTags(articleContent.amenities, 'amenities')}
                </div>
            }
            <ArticleFooter onAddTagClick={this.handleOnAddTagClick.bind(this)} />
          </div>
        </div>
      </section>
    );
  }
}

ArticleFullPage.propTypes = {
  articleContent: PropTypes.object,
  onAddArticleTag: PropTypes.func,
  backToSearch: PropTypes.func
};

ArticleTile.propTypes = {
  window: PropTypes.object,
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.object,
  viewArticle: PropTypes.func,
  tile: PropTypes.object
};
