//This program writes out the Dockerfile and modified reverse-tunnel.js files.

/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: http://rpiovn.org/license 
 */

var fs = require('fs');
var Promise = require('node-promise');

var globalThis; //Used in functions below when 'this' loses context.

function Constructor() {

  globalThis = this;
  
  var port="6101";
  var username = "testname";
  var password = "testpass";


  this.writeDockerfile = function(port, username, password) {

    var promise = new Promise.Promise();
    
    var fileString = "FROM resin/rpi-raspbian\n"+
        "MAINTAINER Chris Troutner <chris.troutner@gmail.com>\n"+
        "RUN apt-get update\n"+
        "RUN apt-get install -y openssh-server\n"+
        "RUN apt-get install nano\n"+
        "RUN apt-get install ssh\n"+
        "RUN mkdir /var/run/sshd\n"+
        "RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd\n"+
        "ENV NOTVISIBLE \"in users profile\"\n"+
        "RUN echo \"export VISIBLE=now\" >> /etc/profile\n"+
        "RUN curl -sL https://deb.nodesource.com/setup_4.x -o nodesource_setup.sh\n"+
        "RUN bash nodesource_setup.sh\n"+
        "RUN apt-get install -y nodejs\n"+
        "RUN apt-get install -y build-essential\n"+
        "RUN npm install express\n"+
        "RUN npm install reverse-tunnel-ssh\n"+
        "RUN useradd -ms /bin/bash "+username+"\n"+
        "RUN echo "+username+":"+password+" | chpasswd\n"+
        "EXPOSE "+port+"\n"+
        "EXPOSE 3100\n"+
        "COPY dummyapp.js dummyapp.js\n"+
        "COPY finalsetup finalsetup\n"+
        "COPY reverse-tunnel-generated.js reverse-tunnel.js\n"+
        "RUN chmod 775 finalsetup\n"+
        "ENTRYPOINT [\"./finalsetup\", \"node\", \"dummyapp.js\"]\n";
        //"ENTRYPOINT [\"./finalsetup\", \"node\", \"reverse-tunnel.js\"]\n";


    fs.writeFile('./Dockerfile', fileString, function (err) {

      if(err) {
        debugger;
        console.error('Error while trying to write file: ', err);
        promise.reject(err);

      } else {
        console.log('Dockerfile written successfully!');
        promise.resolve();
      }
    });
    
    return promise;
  };

  this.writeReverseTunnel = function(port, username, password) {
    debugger;
    
    var promise = new Promise.Promise();
    
    var fileString = "var tunnel = require('reverse-tunnel-ssh');\n"+
      "tunnel({\n"+
      "  host: '"+global.sshServerIp+"',\n"+
      "  port: "+global.sshServerPort+",\n"+
      "  username: 'sshuser',\n"+
      "  password: 'sshuserpassword',\n"+
      "  dstHost: '0.0.0.0',\n"+
      "  dstPort: "+port+", \n"+
      "  srcPort: 3100 \n"+
      "}, function(error, clientConnection) {\n"+
      "  if(error)\n"+
      "    console.error('Error! ', error);\n"+
      "});";
    
    fs.writeFile('./reverse-tunnel-generated.js', fileString, function (err) {

      if(err) {
        debugger;
        console.error('Error while trying to write file: ', err);
        promise.reject(err);
        
      } else {
        console.log('reverse-tunnel-generated.js written successfully!');
        promise.resolve();
      }
    });
    
    return promise;
  };
  



  return(this);
  
}

exports.Constructor = Constructor;