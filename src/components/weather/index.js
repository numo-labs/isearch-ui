import NavHeader from '../../../lib/nav-header/';
import React, { Component, PropTypes } from 'react';

class WeatherFullPage extends Component {

  loadWeather () {
    const { params: { itemId }, items, getWeather, weather } = this.props;

    const tile = items.filter((item) => item.id === itemId)[0];
    if (tile) {
      return tile.tile;
    } else if (weather.id === itemId) {
      return weather;
    } else {
      getWeather(itemId);
      return null;
    }
  }

  render () {
    const { goBack, go } = this.props;

    const weather = this.loadWeather();

    if (!weather) {
      return (<div/>);
    }

    return (
      <section>
        <NavHeader backToSearch={goBack} go={go}/>
        <div className='articleFullPageContainer'>
          <div className='articleHeaderImage' style={{backgroundImage: `url(${weather.image})`}} />
        </div>
      </section>
    );
  }
}

WeatherFullPage.propTypes = {
  params: PropTypes.object,
  items: PropTypes.array,
  go: PropTypes.func,
  goBack: PropTypes.func,
  getWeather: PropTypes.func,
  weather: PropTypes.object
};

export default WeatherFullPage;
