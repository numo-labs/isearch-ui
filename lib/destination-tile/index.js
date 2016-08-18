import React, { Component, PropTypes } from 'react';
import './styles.css';
import ReactPlayer from 'react-player';
import FadeImage from '../fade-image';
import striptags from 'striptags';
import defaultImage from '../../src/constants/default-image';
import { VIEW_FILM } from '../../src/constants/actionTypes';

class DestinationTile extends Component {
  constructor () {
    super();
    this.state = {
      viewFilm: false
    };
  }
  rawMarkup (value) {
    return { __html: value };
  }

  handleOnClick () {
    this.setState({
      viewFilm: true
    });
  }

  componentWillReceiveProps (nextProps) {
    if (
      !this.props.filmInView &&
      nextProps.filmInView
    ) {
      this.props.dispatch({
        type: VIEW_FILM
      });
    }
  }

  render () {
    const { tile: { sections, videoUrl } } = this.props;
    const { image, title, text } = sections[0];
    const imageSrc = image || defaultImage;
    const tileMedia = videoUrl ? <ReactPlayer url={videoUrl} playing volume={0} width={'100%'} height={'100%'} /> : <FadeImage className='destinationImage' src={imageSrc}/>;
    let previewTextArray = text.trim()
                               .split('')
                               .slice(0, 292);

    const previewText = striptags(previewTextArray.join('').trim()) + '…';
    return (
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
    );
  }
}

export default DestinationTile;

DestinationTile.propTypes = {
  tile: PropTypes.object,
  filmInView: PropTypes.bool,
  dispatch: PropTypes.func,
  videoUrl: PropTypes.string
};
