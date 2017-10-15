FROM resin/rpi-raspbian
MAINTAINER Chris Troutner <chris.troutner@gmail.com>
RUN apt-get update
RUN apt-get install -y openssh-server
RUN apt-get install nano
RUN apt-get install ssh
RUN mkdir /var/run/sshd
RUN sed 's@sessions*requireds*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile
RUN curl -sL https://deb.nodesource.com/setup_4.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN npm install express
RUN useradd -ms /bin/bash tlBCyB4W1E
RUN echo tlBCyB4W1E:6xBSEhVkxa | chpasswd
EXPOSE 3016
EXPOSE 3100
COPY dummyapp.js dummyapp.js
COPY finalsetup finalsetup
RUN chmod 775 finalsetup
ENTRYPOINT ["./finalsetup", "node", "dummyapp.js"]
