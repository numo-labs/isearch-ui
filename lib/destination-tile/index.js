import React, { Component, PropTypes } from 'react';
import './styles.css';
import ReactPlayer from 'react-player';
import FadeImage from '../fade-image';
import striptags from 'striptags';

import { defaultImage } from '../../src/constants/image-paths';

function findNodeOffsetFromWindowTop (node) {
  if (!node) { // offsetParent of the body node is null
    return 0;
  }
  return node.offsetTop + findNodeOffsetFromWindowTop(node.offsetParent);
}

class DestinationTile extends Component {
  constructor () {
    super();
    this.state = {
      tileInView: false
    };
    this._scrollHandler = this._scrollHandler.bind(this);
  }

  componentDidMount () {
    this._attachScrollListeners();
  }

  _attachScrollListeners () {
    ['scroll', 'resize'].map((e) => window.addEventListener(e, this._scrollHandler));
  }

  _removeScrollListeners () {
    ['scroll', 'resize'].map((e) => window.removeEventListener(e, this._scrollHandler));
  }

  _scrollHandler () {
    const node = this._scrollView;
    const nodeOffsetFromWindowTop = findNodeOffsetFromWindowTop(node);
    if (nodeOffsetFromWindowTop > window.pageYOffset + window.innerHeight - 120 || nodeOffsetFromWindowTop < window.pageYOffset - 120) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  }

  pauseVideo () {
    this.setState({
      tileInView: false
    });
  }

  playVideo () {
    this.setState({
      tileInView: true
    });
  }

  componentDidUpdate () {
    this._attachScrollListeners();
  }

  rawMarkup (value) {
    return { __html: value };
  }

  componentWillUnmount () {
    this._removeScrollListeners();
  }

  renderNumberOfDestinationsAndHotels () {
    const tile = this.props;
    const destinationHotelFigures = `${tile.destinations} / ${tile.numberOfHotels}`;
    return (
      <div className='destHotelContainer'>
        <div className='destHotelFigures'>{destinationHotelFigures}</div>
        <div className='destHotelTagContainer'>
          <div className='destTag'>Dest.</div>
          <div className='hotelsTag'>Hotels</div>
        </div>
      </div>
    );
  }

  render () {
    const { tile: { sections } } = this.props;
    const destinationsAvailable = this.props.tile.destinations;
    const hotelsAvailable = this.props.tile.numberOfHotels;
    const { image, title, text } = sections[0];
    const imageSrc = image || defaultImage;
    const videoUrl = sections[0].videoUrl;
    const tileMedia = videoUrl ? <ReactPlayer url={`${videoUrl}#t=2`} playing={this.state.tileInView} controls volume={0} width={'100%'} height={'100%'} /> : <FadeImage className='destinationImage' src={imageSrc}/>;
    let previewTextArray = text.trim()
                               .split('')
                               .slice(0, 292);

    const previewText = striptags(previewTextArray.join('').trim()) + '…';
    return (
      <div ref={(ref) => this._scrollView = ref}>
        <div className='destinationTileContainer'>
          { tileMedia }
          <div className='destinationContentContainer'>
            <div className='titleDestHotelContainer'>
              <div className='destinationTitleContainer'>
                <div className='destinationTitle'>{title}</div>
                {
                  destinationsAvailable &&
                  hotelsAvailable &&
                  this.renderNumberOfDestinationsAndHotels()
                }
              </div>
            </div>
            <div className='destinationDescription'>
              {previewText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DestinationTile;

DestinationTile.propTypes = {
  tile: PropTypes.object,
  dispatch: PropTypes.func,
  videoUrl: PropTypes.string
};
