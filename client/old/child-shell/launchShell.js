// REQUIRED LIBRARIES
var exec = require('child_process').exec; //Used to execute command line instructions.
var fs = require('fs');

//Command to clear the PM2 log: 'pm2 flush'
exec('./runImage', function(err, stdout, stderr) {
  //debugger;

  if (err) {
      console.log('child process exited with error code ' + err.code);
      return false;
  } else {
    console.log('Docker container launched successfully!');
  }

  return true;

});