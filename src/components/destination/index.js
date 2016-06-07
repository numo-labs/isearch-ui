import React, { Component, PropTypes } from 'react';
import ArticleFullPage from '../article';

class DestinationFullPage extends Component {
  render () {
    const {
      articleContent,
      goBack,
      getArticle,
      params,
      addSingleTag
     } = this.props;
    return (
      <ArticleFullPage
        articleContent={articleContent}
        goBack={goBack}
        getArticle={getArticle}
        params={params}
        addSingleTag={addSingleTag}
      >
        {'put map in here'}
      </ArticleFullPage>
    );
  }
}

DestinationFullPage.propTypes = {
  articleContent: PropTypes.object,
  goBack: PropTypes.func,
  getArticle: PropTypes.func,
  params: PropTypes.object,
  addSingleTag: PropTypes.func,
  markers: PropTypes.array
};

export default DestinationFullPage;
