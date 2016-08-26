import NavHeader from '../../../lib/nav-header/';
import React, { Component, PropTypes } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

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

  renderGraph (weather) {
    const data = months.map((month, i) => {
      return {
        month: month.substr(0, 3),
        high: weather.high[i],
        low: weather.low[i]
      };
    });
    const yFormatter = (value) => `${value}°C`;
    const max = Math.max.apply(Math, weather.high);
    const top = 5 * Math.ceil((max + 1) / 5);

    return (
      <ResponsiveContainer height={500}>
        <BarChart data={data} margin={{left: 0, top: 5, right: 10, bottom: 5}}>
          <XAxis dataKey='month'/>
          <YAxis tickFormatter={yFormatter} tickLine={false} domain={[0, top]} tickCount={(top / 5) + 1} width={40}/>
          <CartesianGrid vertical={false}/>
          <Bar dataKey='high' name='High °C' fill='#fecd2f' isAnimationActive={false}/>
          <Bar dataKey='low' name='Low °C' fill='#abd8a3' isAnimationActive={false}/>
          <Legend/>
        </BarChart>
      </ResponsiveContainer>
    );
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
          <div className='weatherContentContainer'>
            <div className='weatherHeader'>{weather.displayName}</div>
            <div className='weatherSubtitle'>Vejrudsigt</div>

            <h2>Temperatur per måned</h2>
            {this.renderGraph(weather)}

            <h2>Vandtemperatur (°C)</h2>
            {this.renderTable(weather.high)}

            <h2>Regnfri dage</h2>
            {this.renderTable(weather.rainfree)}

            <h2>Soltimer/dag</h2>
            {this.renderTable(weather.sunhours)}
          </div>
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
