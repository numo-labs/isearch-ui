import React, { Component, PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';
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
        <div style={{height: '400px', marginBottom: '50px'}}>
          <GoogleMapLoader
            containerElement={<div style={{height: '100%'}}/>}
            googleMapElement={
              <GoogleMap
                ref={(map) => (map) => console.log(map)}
                defaultZoom={5}
                defaultCenter={{ lat: 40.41, lng: -3.7 }}
              />
            }
          />
        </div>
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
