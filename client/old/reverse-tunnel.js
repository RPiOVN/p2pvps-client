//tunnel is a ssh2 clientConnection object
var tunnel = require('reverse-tunnel-ssh');

tunnel({
  host: '45.55.12.52',
  port: 6100, //The SSH port on the server.
  username: 'sshuser',
  password: 'sshuserpassword',
  dstHost: '0.0.0.0', // bind to all IPv4 interfaces
  dstPort: 6101, //The new port that will be opened
  //srcHost: '127.0.0.1', // default
  srcPort: 3100 // The port on the Pi to tunnel to.
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);

});
