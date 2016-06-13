import React, { Component, PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
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
    const latitude = articleContent.location ? Number(articleContent.location.lat) : 0;
    const longitude = articleContent.location ? Number(articleContent.location.lon) : 0;
    const marker = {
      position: {
        lat: latitude,
        lng: longitude
      },
      defaultAnimation: 4
    };
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
                defaultZoom={6}
                defaultCenter={{ lat: latitude, lng: longitude }}
              >
              <Marker
                {...marker}
                opacity={0.8}
              />
              </GoogleMap>
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
