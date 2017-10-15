# This repository is obsolete:
This is an old repository. The code in the `server` directory was a ConnextCMS site template prototype for the 
[p2pvps-server repository](https://github.com/RPiOVN/p2pvps-server). The prototype code used Backbone.js,
but the new site repository uses Vue.js. The code in the `client` directory was similarly a prototype.
This code is being forked to the **p2pvsp-client repository** (link coming soon).

---

# RPi Broker
## What is RPi Broker?
RPi Broker aspires to create a marketplace offering Virtal Private Servers (VPS), similar to 
[Digital Ocean](http://digitalocean.com) or [Vultr](http://vultr.com). This would also be similar
to co-location services like [Raspberry Pi Hosting](https://raspberry-hosting.com/en) or 
[Mythic Beasts](https://www.mythic-beasts.com/order/rpi).
However, instead of using a data center,
the marketplace would use an array of psudo-anonymous [Raspberry Pi](https://www.raspberrypi.org/) 
(or other IoT devices) hosted by people participating in a marketplace. Anyone
with an internet connection and a device capable of running [Docker](https://www.docker.com/) can rent
that device in the RPi Broker marketplace.

While [the applications of such a network](https://raspberry-hosting.com/en/applications) are similar, 
the RPi Broker marketplace will never have the speed or reliabilty of the commercial outfits linked above.
Instead, the focus of RPi Broker is to create a decentralized network for censor-proof, anonymous web servers,
capable of delivering websites or web apps.

Imagine being able to spin up multiple copies of your server, in multiple locations, in a matter of seconds, 
all hundreds of times faster than
any government could censor them. And the servers can be paid for with Bitcoin or other cryptocurrency. As
long as you're carefull in how you obtain that cryptocurrency, you could create the servers anonymously, without
any paper trail back to you. Due to a strongly encrypted Docker container, the people hosting the physical device
have no way to know what is being served or ability to access the files on the device.
That's the focus of the RPi Broker network. In this way, RPi Broker is censhorship-fighting
software similar to, but very different from, [TOR](https://www.torproject.org/).

# State of Development
Update: **8/11/17**

This project is brand new and is still in the very early stages of development. The good news is that the technology
stack needed to turn the vision into reality has already been identified. It's simply a matter of connecting the pieces
and developing a user interface.

If you are an experienced JavaScript programmer, we could use your help! 
We can reimburse developers with equity in future income.
Check out the [RPi Broker Project Page](http://rpiovn.org/project/rpi-broker)
for details on how to contribute.

## Project Highlights
Here's what has been accomplished so far:

* A [High Level Specification Document](specifications/SPECIFICATION.md) has been created that discusses the
technology stack and flow mechanics of how the marketplace will operate. 

* [User Experience Stories](specifications/user-experience-and-view-descriptions.md) have been developed to
capture the details of the user interface. HTML mockups for the various Views described in this document
are currently being developed.

* The core technology of this project is [Reverse SSH](https://blog.devolutions.net/2017/03/what-is-reverse-ssh-port-forwarding.html). 
A [Dockerfile](server/sshd-container/Dockerfile) 
is currently being developed to act as an SSH router to connect renters to the devices.

* The `server/` directory is formatted as a [site template](https://github.com/skagitpublishing/site-template-connextcms) 
for [ConnextCMS](http://connextcms.com). This will contain the website files that will make up the marketplace and user
dashboards (the web app).

* Mockups have been created for the following views:
  * [Marketplace View](images/marketplace-mockup.JPG)
  * [Rental View](images/rental-mockup.JPG)
  * [Owned Devices View](images/owned-devices-mockup.JPG)