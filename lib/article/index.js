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
    console.log('------>', tile.tags[tile.tags.length - 1].label);
    return (
        <div className='articleContainer'
          onClick={ () => {
            moveScrollToTop(this.props.window);
            this.props.viewArticle(this.props.tile);
          }}
        >
          <img className='articleImage' src={tile.sections && tile.sections[0].image} />
          <div className='type'>
            <h5>{tile.tags[tile.tags.length - 1].label}</h5>
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

    return (
      <section>
        <NavHeader backToSearch={backToSearch} />
        <div className='articleFullPageContainer'>
          { articleContent.sections.map((section, key) => {
            return (
              <section>
                {key === 0 && section.image ? <div className='articleHeader' style={{backgroundImage: `url(${section.image})`}} /> : null}
                <div key={key} className='articleSection'>
                  {key !== 0 && section.image ? <div className='articleImage' style={{backgroundImage: `url(${section.image})`}}> <img src={section.image}/> </div> : null}
                  {section.title ? (key === 0 ? <h1>{section.title}</h1> : <h2 >{section.title}</h2>) : null}
                  {section.text ? <p className='articleText'>{section.text}</p> : null}
                </div>
              </section>
            );
          })}
          <div className='tagSection'>
            {renderTags(articleContent.geo, 'geo')}
            {renderTags(articleContent.amenities, 'amenities')}
          </div>
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
  viewArticle: PropTypes.func,
  tile: PropTypes.object
};
