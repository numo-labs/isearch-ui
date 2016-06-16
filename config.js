const config = {
  common: {
    socketUrl: 'https://ci-socket-server.tcdl.io?auto_room=false',
    graphqlUrl: 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/graphql',
    bucketUrl: 'https://numo-search-results.s3.amazonaws.com/ci/'
  },
  ci: {
    socketUrl: 'https://ci-socket-server.tcdl.io?auto_room=false',
    graphqlUrl: 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/ci/graphql',
    bucketUrl: 'https://numo-search-results.s3.amazonaws.com/ci/'
  },
  production: {
    socketUrl: 'https://socket-server.tcdl.io?auto_room=false',
    graphqlUrl: 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/prod/graphql',
    bucketUrl: 'https://numo-search-results.s3.amazonaws.com/prod/'
  }
};

export default config;
