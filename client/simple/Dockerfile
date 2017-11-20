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
WORKDIR /root
COPY package.json package.json
RUN npm install
EXPOSE 3100
COPY dummyapp.js dummyapp.js
COPY finalsetup finalsetup
COPY connectClient.js connectClient.js
COPY package.json package.json
COPY config.json config.json
COPY reverse-tunnel-generated.js reverse-tunnel.js
RUN chmod 775 finalsetup
RUN useradd -ms /bin/bash vzF8Mm8c1L
RUN echo vzF8Mm8c1L:ePVzwmIm1W | chpasswd
EXPOSE 6001
ENTRYPOINT ["./finalsetup", "node", "connectClient.js"]
