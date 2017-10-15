var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: '192.168.2.2',
  port: 6100,
  username: 'sshuser',
  password: 'sshuserpassword',
  dstHost: '0.0.0.0',
  dstPort: 6001, 
  srcPort: 3100 
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);
});