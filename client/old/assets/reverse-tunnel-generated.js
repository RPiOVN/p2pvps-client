var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: 'undefined',
  port: 6100,
  username: 'tlBCyB4W1E',
  password: '6xBSEhVkxa',
  dstHost: '0.0.0.0',
  dstPort: 3016, 
  srcPort: 3100 
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);
});