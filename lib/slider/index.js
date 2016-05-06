import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import { SliderArrowRight, SliderArrowLeft } from './arrows.js';

import './style.css';

export default class ISearchSlider extends Component {
  constructor () {
    super();
    this.state = {
      currentSlide: 1
    };
  }

  changeSlide (slide) {
    this.setState({currentSlide: slide + 1});
  }

  render () {
    const { images, className } = this.props;
    const currentSlide = this.state.currentSlide;

    const sliderSettings = {
      accessibility: false,
      arrows: images.length > 1,
      infinite: false,
      afterChange: this.changeSlide.bind(this),
      nextArrow: SliderArrowRight,
      prevArrow: SliderArrowLeft
    };

    return (
      <div className={`slider ${className}`}>
        <Slider {...sliderSettings}>
          {images.map((image, key) => {
            return (
              <div key={key} className='sliderImage' style={{backgroundImage: `url(${image})`}}>
                <img src={image}/>
              </div>
            );
          })}
        </Slider>
        <div className='sliderCounter'><span className='currentSlide'>{currentSlide}</span>/{images.length}</div>
      </div>
    );
  }
}

ISearchSlider.propTypes = {
  images: PropTypes.array,
  className: PropTypes.string
};
