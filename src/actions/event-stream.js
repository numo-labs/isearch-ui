import connect from '../utils/websockets';

let connection;

export function push (eventType, tileId) {
  return (dispatch, getState) => {
    connection = connection || connect();
    const {
      search: {
        tags,
        fingerprint
      }
    } = getState();
    connection.write({
      action: 'event',
      data: {
        type: eventType,
        id: tileId,
        user: fingerprint,
        tags: tags.map(tag => tag.id)
      }
    });
  };
}
