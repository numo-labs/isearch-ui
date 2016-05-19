
var primus = new Primus('http://eb-ci.wmm63vqska.eu-west-1.elasticbeanstalk.com');

primus.on('data', function received (data) {
  console.log('web socket data', JSON.stringify(data));
});
