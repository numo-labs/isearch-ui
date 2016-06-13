const config = {
  common: {
    socketUrl: 'https://ci-socket-server.tcdl.io?auto_room=false',
    graphqlUrl: 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/graphql'
  },
  ci: {
    socketUrl: 'https://ci-socket-server.tcdl.io?auto_room=false',
    graphqlUrl: 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/graphql'
  },
  production: {
    socketUrl: 'https://socket-server.tcdl.io?auto_room=false',
    graphqlUrl: 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/prod/graphql'
  }
};

export default config;
