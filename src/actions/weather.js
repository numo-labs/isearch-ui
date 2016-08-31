import { UPDATE_WEATHER } from '../constants/actionTypes';
import 'whatwg-fetch';

import configuration from '../../config';
import configure from 'con.figure';

const config = configure(configuration);

export const getWeather = (itemId) => {
  return (dispatch) => {
    const url = `${config.weatherBucketUrl}${itemId}.json`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log('parsed json', json);
        dispatch({
          type: UPDATE_WEATHER,
          data: {
            ...json,
            id: itemId
          }
        });
      });
  };
};
