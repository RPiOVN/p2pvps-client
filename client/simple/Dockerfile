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
RUN npm install reverse-tunnel-ssh
RUN useradd -ms /bin/bash WI4mljaHzC
RUN echo WI4mljaHzC:C64BWtx6bI | chpasswd
EXPOSE 6002
EXPOSE 3100
COPY dummyapp.js dummyapp.js
COPY finalsetup finalsetup
COPY reverse-tunnel-generated.js reverse-tunnel.js
RUN chmod 775 finalsetup
ENTRYPOINT ["./finalsetup", "node", "dummyapp.js"]
