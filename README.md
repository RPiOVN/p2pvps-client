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
3. *The Marketplace* which is a Vue.js client-side application which facilitates transactions and administration of devices.

This repository contains *The Client*. [The Server and Marketplace software can be found here](https://github.com/RPiOVN/p2pvps-server).

### File Layout
* The `client` directory contains various implementations of the P2P VPS Client code. 