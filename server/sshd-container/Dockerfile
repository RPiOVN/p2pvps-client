#Copyright 2017 RPiOVN.org
#Licensing Information: http://rpiovn.org/license 

#Create a minimal Ubuntu shell running SSHD.
#Adapted from this tutorial: https://docs.docker.com/engine/examples/running_ssh_service/#build-an-eg_sshd-image

FROM ubuntu:17.04
MAINTAINER Chris Troutner <chris.troutner@gmail.com>

#Install dependant packages
RUN apt-get update 
RUN apt-get install -y openssh-server
#RUN apt-get install -y sudo

#Configure SSHD
RUN mkdir /var/run/sshd
#RUN echo 'root:rootpassword' | chpasswd
#RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

#Install KeystoneJS Dependencies
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y curl
RUN apt-get install -y nano
#RUN apt-get install -y python

#Install Node and NPM
RUN curl -sL https://deb.nodesource.com/setup_4.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
#RUN npm install -g npm
RUN npm install express

#Create the user and add them to the sudo group.
RUN useradd -ms /bin/bash sshuser
#RUN adduser sshuser sudo

#Set password to 'password' change value below if you want a different password
RUN echo sshuser:sshuserpassword | chpasswd


EXPOSE 6000-6200

COPY finalsetup finalsetup
COPY dummyapp.js dummyapp.js
COPY sshd_config /etc/ssh/sshd_config

#Dummy app just to get the container running with docker-compose.
#You can then enter the container with command: docker exec -it <container ID> /bin/bash
#WORKDIR /home/connextcms/myCMS

#CMD ["node", "dummyapp.js"]

#CMD ["/usr/sbin/sshd", "-D", "-p", "4100"]

ENTRYPOINT ["./finalsetup", "node", "dummyapp.js"]

