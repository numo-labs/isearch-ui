import React, { PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import ISearchSlider from '../../../lib/image-slider';
import NavHeader from '../../../lib/nav-header/';
import ArticleFooter from '../../../lib/article-tile/article-footer.js';
import FadeImage from '../../../lib/fade-image';
import './style.css';
import StaticBaseClass from '../staticBaseClass';

class DestinationFullPage extends StaticBaseClass {
  renderImageList (images) {
    return images.map((image, idx) => {
      return (
        <img key={idx} src={image}/>
      );
    });
  }
  render () {
    const {
      articleContent,
      goBack,
      go
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
    if (!articleContent.name) {
      return (<section/>);
    }
    const introSection = articleContent.sections && articleContent.sections.length ? articleContent.sections[0] : '';
    const videoClipUrl = articleContent.sections[0].videoUrl;
    return (
      <section>
        <NavHeader backToSearch={goBack} go={go}/>
        <FadeImage isBackground={Boolean(true)} className='hotelPackageImage' src={ articleContent.images && articleContent.images.length > 0 ? articleContent.images[0] : (introSection.image || '') } />
        {articleContent.images && articleContent.images.length > 0 && <ISearchSlider images={articleContent.images} className='destSlider'/>}
        <div className='destinationContainer'>
          <section>
            <div className='articleSection'>
              <div className='articleHeader'>{introSection.title}</div>
              {introSection.text ? <div className='articleIntroText' dangerouslySetInnerHTML={this.rawMarkup(introSection.text)}/> : null}
            </div>
          </section>
          <div style={{height: '400px', marginBottom: '50px'}}>
            <GoogleMapLoader
              containerElement={<div style={{height: '100%'}}/>}
              googleMapElement={
                <GoogleMap
                  ref={(map) => (map) => console.log(map)}
                  defaultZoom={6}
                  defaultCenter={marker.position}
                >
                <Marker
                  {...marker}
                  opacity={0.8}
                />
                </GoogleMap>
              }
            />
          </div>
          {
            videoClipUrl &&
            <div className='videoPlayerContainer'>
              <video controls width={'100%'} src={`${videoClipUrl}#t=2`} className='videoPlay'></video>
            </div>
          }
          <div className='destImagesContainer'>
            {articleContent.images && articleContent.images.length > 1 && <h2 className='imagesHeading'>Billeder</h2> && this.renderImageList(articleContent.images.slice(1))}
          </div>
        <ArticleFooter articleName={articleContent.name} onAddTagClick={this.onAddTagClick} />
        </div>
      </section>
    );
  }
}

DestinationFullPage.propTypes = {
  articleContent: PropTypes.object,
  goBack: PropTypes.func,
  go: PropTypes.func,
  getArticle: PropTypes.func,
  params: PropTypes.object,
  addSingleTag: PropTypes.func,
  markers: PropTypes.array,
  addArticleTag: PropTypes.func
};

export default DestinationFullPage;
