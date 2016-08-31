
import { Component, PropTypes } from 'react';

class StaticBaseClass extends Component {
  constructor () {
    super();
    this.onAddTagClick = this.onAddTagClick.bind(this);
    this.getArticleData = this.getArticleData.bind(this);
    this.state = {
      articleContent: {}
    };
  }
  componentWillMount () {
    this.getArticleData();
  }
  getArticleData () {
    this.props.getArticle(this.props.params.bucketId, this.props.params.itemId);
    this.setState({ articleContent: this.props.articleContent });
  }
  addAnalyticsData () {
    const content = this.props.articleContent;
    if (dataLayer) {
      dataLayer.push({
        'event': 'productViewed',
        'pageName': (content.type === 'article' ? '/article/' : '/destination/') + content.name.replace(/ /g, '-'),
        'ecommerce': {
          'detail': {
            'actionField': { 'list': 'inspirational search feed' },
            'products': [ {
              'id': content.name,
              'brand': content.type === 'article' ? 'article_tile' : 'destination_tile'
            } ]
          }
        }
      });
    }
  }
  rawMarkup (value) {
    return { __html: value };
  }
  onAddTagClick () {
    const { articleContent, goBack, addArticleTag } = this.props;
    addArticleTag(articleContent.name, articleContent.id, articleContent.name);
    goBack();
  }
}

StaticBaseClass.propTypes = {
  articleContent: PropTypes.object,
  goBack: PropTypes.func,
  getArticle: PropTypes.func,
  params: PropTypes.object,
  addArticleTag: PropTypes.func
};

export default StaticBaseClass;
