var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: 'undefined',
  port: 6100,
  username: 'j7kTQRdeLz',
  password: 'jFRUwiGhmG',
  dstHost: '0.0.0.0',
  dstPort: 6001,
  srcPort: 3100
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);
});

