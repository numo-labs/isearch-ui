import React, { PropTypes, Component } from 'react';

require('./style.css');

export default class PackageTile extends Component {
  render () {
    // const { package } = this.props;
    return (
      <div className='container'>
        <div className='packageImage'>
          <div className='mintBar'>CHILD FRIENDLY</div>
        </div>
        <div className='descriptionContainer'>
          <div className='topContainer'>
            <div className='packageTitle'>Sunwing Side East Beach</div>
            <div className='packageSubtitle'>Side, Antalya-area Turkey</div>
            <div className='heartsContainer'>
              <img className='heart' src='http://marcommnews.com/wp-content/uploads/2013/10/heart_482.jpg'/>
              <img className='heart' src='http://marcommnews.com/wp-content/uploads/2013/10/heart_482.jpg'/>
              <img className='heart' src='http://marcommnews.com/wp-content/uploads/2013/10/heart_482.jpg'/>
              <img className='heart' src='http://marcommnews.com/wp-content/uploads/2013/10/heart_482.jpg'/>
            </div>
            <div className='ratingNumerator'>4.4</div><div className='ratingDenominator'>/5</div>
          </div>
          <div className='bottomContainer'>
            <div className='row'>
              <div className='packageDetailsText'> ✔ Breakfast buffet</div>
              <div className='strikethroughText'>30.280</div>
            </div>
            <div className='row'>
              <div className='date'>16 nov 2015, 1 week</div>
              <div className='price'>27.440:-</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PackageTile.propTypes = {

};
