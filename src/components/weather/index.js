import NavHeader from '../../../lib/nav-header/';
import React, { Component, PropTypes } from 'react';

import './style.css';

import months from '../../constants/month-names';

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

  renderTable (data) {
    return (<table>
      <thead>
        <tr>
          {months.map((month) => {
            return (<th>{month.substr(0, 3)}</th>);
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map((t) => {
            return (<td>{typeof t === 'number' ? t : '-'}</td>);
          })}
        </tr>
      </tbody>
    </table>);
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
        <div className='weatherFullPageContainer'>
          <div className='weatherHeaderImage' style={{backgroundImage: `url(${weather.image})`}} />
          <div className='weatherHeader'>{weather.displayName}</div>
          <div className='weatherSubtitle'>Vejrudsigt</div>

          <h2>Temperatur per måned</h2>

          <h2>Vandtemperatur (°C)</h2>
          {this.renderTable(weather.high)}

          <h2>Regnfri dage</h2>
          {this.renderTable(weather.rainfree)}

          <h2>Soltimer/dag</h2>
          {this.renderTable(weather.sunhours)}
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
