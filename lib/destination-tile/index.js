import React, { Component, PropTypes } from 'react';
import './styles.css';
import ReactPlayer from 'react-player';
import FadeImage from '../fade-image';
import striptags from 'striptags';
import defaultImage from '../../src/constants/default-image';

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

  findNodeOffset () {
    const node = this._scrollView;
    const nodeHeight = node.offsetHeight; // height of the element
    const fromTop = findNodeOffsetFromWindowTop(node); // y displacement of the top of the node from the top of the window
    return fromTop + nodeHeight - window.pageYOffset - window.innerHeight; // offset of the node from the bottom of the window
  }

  _scrollHandler () {
    const nodeOffsetFromWindowBottom = this.findNodeOffset();
    if (nodeOffsetFromWindowBottom < window.pageYOffset) { // almost reached the bottom of the scrollView container so call the loadData function prop
      // remove the scroll listener until the component has updated to prevent unecessary calls to the load more function before new data has been loaded
      // scroll listeners added back on componentDidUpdate
      this._removeScrollListeners();
      this.setState({
        tileInView: true
      });
    }
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

  render () {
    const { tile: { sections } } = this.props;
    const { image, title, text } = sections[0];
    const imageSrc = image || defaultImage;
    const videoUrl = sections[0].videoUrl;
    const tileMedia = videoUrl ? <ReactPlayer url={videoUrl} playing={this.state.tileInView} volume={0} width={'100%'} height={'100%'} /> : <FadeImage className='destinationImage' src={imageSrc}/>;
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
              </div>
              <div className='destHotelContainer'>
                <div className='destHotelFigures'>20 / 183</div>
                <div className='destHotelTagContainer'>
                  <div className='destTag'>Dest.</div>
                  <div className='hotelsTag'>Hotels</div>
                </div>
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
