import moment from 'moment';

export default function departOnFriday (date) {
  const dayOfTheWeek = date.day();
  const friday = 5;
  const diff = dayOfTheWeek - friday;
  if (diff > 0) {
    date = moment(date).add(6, 'd');
  } else if (diff < 0) {
    const daysToAdd = -1 * diff;
    date = moment(date).add(daysToAdd, 'd');
  }
  return date;
}
