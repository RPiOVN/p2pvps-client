# P2P VPS - Client

## What is P2P VPS?
P2P VPS aspires to create a peer-to-peer (P2P) marketplace offering Virtal Private Servers (VPS), similar to 
[Digital Ocean](http://digitalocean.com) or [Vultr](http://vultr.com). This would also be similar
to co-location services like [Raspberry Pi Hosting](https://raspberry-hosting.com/en) or 
[Mythic Beasts](https://www.mythic-beasts.com/order/rpi).
However, instead of using a data center,
the marketplace would use an array of psudo-anonymous IoT devices (like the [Raspberry Pi](https://www.raspberrypi.org/))
hosted by people participating in the marketplace. Anyone
with an internet connection and a device capable of running [Docker](https://www.docker.com/) can rent
that device in the P2P VPS marketplace.

While [the applications of such a network](https://raspberry-hosting.com/en/applications) are similar, 
the P2P VPS marketplace will never have the speed or reliabilty of the commercial outfits linked above.
Instead, the focus of P2P VPS is to create a decentralized network of anonymous web servers,
capable of delivering websites or web apps, in order to prevent censorship and promote free speech.

Members participating in the marketplace can earn cryptocurrency by renting out their device, while
helping to create a more decentralized internet at the same time.
That's the focus of the P2P VPS network. In this way, the P2P VPS software is censorship-fighting
software similar to, but very different from, [TOR](https://www.torproject.org/).

## About This Repository
This repository is the server-side software needed to host a P2P VPS marketplace on your own server.
The repository was customized from a forked copy of the [vue-connextcms-site-template](https://github.com/skagitpublishing/vue-connextcms-site-template)
repository. The P2P VPS software is composed of three software packages:

1. *The Client* software runs on the IoT device and allows the device to be rented.
2. *The Server* software includes the database models, REST APIs, and website content.
3. *The Marketplace* is a Vue.js browser-based dashboard which facilitates transactions and administration of devices.

This repository contains *The Client*. [The Server and Marketplace software can be found here](https://github.com/RPiOVN/p2pvps-server).

## Installation
1. Connect your Pi to the internet. Open a command line via the Terminal 
program on the desktop or via SSH over your network. Login and change your
default password. Then update the device with `sudo apt-get update`.

2. Clone this repository with `git clone https://github.com/RPiOVN/p2pvps-client`

3. Navigate to the *simple* shell with `cd p2pvps-client/client/simple`. 

* If you haven't yet installed node, do so with these instructions:
  ``` 
  sudo apt-get remove nodejs
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```


4. Install dependencies with `npm install`.

5. Open `deviceGUID.json` with the command `nano deviceGUID.json`. Replace the example GUID in that file
with the GUID provided by the Market when you registered your device. Save the file by hitting `Ctl-X`, then
press `Y`, then `Enter` to save.

**Image Here**

6. Register your device with the server by running `node registerDevice.js`. This will generate the username,
password, and port that you'll need to log into your device from the internet. It will also generate the files
to setup shell access to the device using reverse-SSH.

7. Install Docker on the Raspberry Pi with this command: `curl -sSL https://get.docker.com | sh`

*You can read more about Docker on the Raspberry Pi [here](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)*

8. Add yourself to the docker group with this command: `sudo usermod -aG docker pi`, then log out, and then back in.

9. Back in the `p2pvps-client/client/simple/` directory, build the Docker container with `./buildImage`. This will take a
while the first time you run it.

10. Finally, execute the Docker container with `./runImage`.

### File Layout
* The `client` directory contains various implementations of the P2P VPS Client code:
  * The `simple` directory creates the simplest client Docker container. It will set up a reverse SSH connection
  with no persistant storage and the user will not have sudo priveldges. It's the simplest, most limited, way
  to create a VPS that can be rented out on P2P VPS.
  
## License
(The MIT License)

Copyright (c) 2017 [Chris Troutner](http://christroutner.com) and [RPiOVN](http://rpiovn.org)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

