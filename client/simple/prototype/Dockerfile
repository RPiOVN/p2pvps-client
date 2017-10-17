#Copyright 2017 RPiOVN.org
#Licensing Information: http://rpiovn.org/license 

#Create a minimal Ubuntu shell running SSHD.
#Adapted from this tutorial: https://docs.docker.com/engine/examples/running_ssh_service/#build-an-eg_sshd-image

#FROM ubuntu:17.04
FROM resin/rpi-raspbian
MAINTAINER Chris Troutner <chris.troutner@gmail.com>

#Install dependant packages
#update gets run when node is downloaded.
RUN apt-get update 
RUN apt-get install -y openssh-server
#RUN apt-get install -y sudo
RUN apt-get install nano
RUN apt-get install ssh

#Configure SSHD
RUN mkdir /var/run/sshd
#RUN echo 'root:rootpassword' | chpasswd
#RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

#Install Node and NPM
RUN curl -sL https://deb.nodesource.com/setup_4.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
#RUN npm install -g npm

#Install npm dependencies
#RUN npm install express
#RUN npm install reverse-tunnel-ssh
WORKDIR /root
COPY package.json package.json
RUN npm install

#Create the user and add them to the sudo group.
RUN useradd -ms /bin/bash testuser
#RUN adduser testuser sudo

#Set password to 'password' change value below if you want a different password
RUN echo testuser:password | chpasswd


#EXPOSE 22
#CMD ["/usr/sbin/sshd", "-D"]
EXPOSE 6101
EXPOSE 3100

COPY dummyapp.js dummyapp.js
COPY finalsetup finalsetup
COPY connectClient.js connectClient.js
COPY package.json package.json
RUN chmod 775 finalsetup

ENTRYPOINT ["./finalsetup", "node", "dummyapp.js"]
