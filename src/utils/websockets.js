import Primus from '../services/primus.js';
import configuration from '../../config';
import configure from 'con.figure';

const config = configure(configuration);

export default function connect () {
  return new Primus(config.socketUrl);
}
