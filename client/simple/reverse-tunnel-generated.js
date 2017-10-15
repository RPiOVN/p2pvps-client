var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: '174.138.35.118',
  port: 6100,
  username: 'sshuser',
  password: 'sshuserpassword',
  dstHost: '0.0.0.0',
  dstPort: 6002, 
  srcPort: 3100 
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);
});