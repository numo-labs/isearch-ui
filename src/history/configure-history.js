import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { basename } from '../../config.js';
export const history = useRouterHistory(createHistory)({
  basename
});
