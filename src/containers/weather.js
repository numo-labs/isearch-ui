import { connect } from 'react-redux';
import WeatherPage from '../components/weather';

import * as WeatherActions from '../actions/weather';
import { routerActions } from 'react-router-redux';

function mapStateToProps (state) {
  const { search: { items }, weather } = state;
  return { items, weather };
}

export default connect(mapStateToProps, { ...routerActions, ...WeatherActions })(WeatherPage);
