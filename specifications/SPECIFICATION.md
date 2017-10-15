# Overview
This document contains a high-level technical overview of the rpibroker suit of software. The suit consists of a
set of server and client software. 

The client software is targeted for Raspberry Pi's minicomputers, but can be operated on
any device that is capable of running Docker. The focus of the client software is to:
* Create a basic Linux environment.
* Establish a reverse SSH connection with the server, to provide a command line interface.

The server software is targeted for cloud VPS servers like Digital Ocean, AWS, etc. The focus of
the server software is to:
* Register incomming connections from client devices.
* Connect device *renters* with device *rentees*.
* Handle payment processing.
* Establish connection with other servers.

# Client Overview
The purpose of the client side software is to create a virtual private server (**VPS**) environment similar to those hosted
by cloud companies such as Digital Ocean or AWS. This is achieved on an IoT device by running a Linux command line inside
a contained Docker environment. Small, indexpensive, distributed hardware like Raspberry Pi minicomputers now posses the
computational power to host such an environment.

This setup has the following advantages:

* By running the environment in a virtual system like Docker, the device can be easily reset to a known state
when the *renter* is done using it.

* By using reverse SSH to connect to a central server, the *rentees* can be provided with a command line interface to the device while
by-passing network firewalls. This creates network risks that *renters* need to be aware of.

* Renting out the computing power of the hardware allows hardware owners to profit from their hardware and internet connection.

* Creating distributed, semi-anonymouse VPS micro-servers, hosted in peoples homes, has interesting legal ramifications and moves the internet towards
a more reliable, censorless architecture.

![Simple server client diagram](images/simple-diagram.jpg?raw=true "Simple server client diagram")

# Server Overview
The primary purpose of the server software is to orchastrate the network of devices and facilitate financial transations. 
Its secondary purpose is to connect with other servers, in order to establish a peer-to-peer (P2P) marketplace, 
with no central point of failure.

## Network Orchestration
A client device registers with a server by making an API call and passing a server-generated key. Upon recieving a valid
registration call, the server opens a new ports and returns this information to the client. The client then makes
reverse SSH connections to forward its local ports to the server's new ports, tunneling through any firewalls, creating 
a command line interface accessible to the renter.

At the same time, a minimal Linux shell (inside a Docker container) with an SSH server is created on the server. This shell allows connection to the
command line interface via SSH (port 22), and also opens port 80 (http) and port 443 (https). A subdomain is created
on the server allowing access to these three ports. This allows clients to connect to the command line on the device and also
serve web pages and web apps.

## Financial Transactions
The first payment method for transacting device rentals will be the Paypal Contracts API. As soon as possible, 
transactions with Bitcoin, Etherium, and other cryptocurrencies will me instituted as well. Cryptocurrencies have the
advantage of allowing server owners to create semi-anonymous markets.

Renters will fill out a form to register their device, be given a key, and
then install the software on the client hardware along with the key. Rental of devices will be billed by the hour.
When a device is registered, its hardware (memory, CPU, hard-drive space) will be verified. It will then be added
to the marketplace and labeled as available for rent. The renters can set the hourly rate they are willing to rent the
device for.

When a renter agrees to the rental contract, the device is taken off the market. A random username and password will
be generated and sent to the renter, and the device will be dedicated for their use. As long as the device is connected
to the internet, the renter will be billed at the hourly rate, until they stop the rental contract. At that point the device
is wiped and re-registered into the marketplace.

## Federated Servers
Server software will be able to establish connections with other servers at the desire of the server administrator. 
This connection will allow a server to add devices to its marketplace that are managed by these third-party servers.
By creating a federation of marketplaces, the overall network has no single point of failure. 

![Federated network of servers](images/federated-diagram.jpg?raw=true "Federated network of servers")


# Client Server Handshaking
Below are a series of steps specifiying how the Server and Client (Raspberry Pi or other IoT device) will initiate a
connection to the Server in order to allow global internet connections to the Client behind any arbitrary firewalls and network devices.

1. The Rentee logs into their account on the Server to register the Client device. They recieve a Hash the Client
uses to identify itself to the Server.

2. The Rentee copies the Hash into a .json file on the Client and starts the Client software.

3. The Client software makes an API call to the Server. It passes in the Hash and the Server responds with
a computer-generated username, password, and three port numbers. These three port numbers will be used for
SSH, HTTP, and HTTPS connections. The client creates three reverse SSH connections, forwarding Client ports 22, 80, and 443
to the three assigned ports on the Server.

4. After receiving the API call, but before responding, the server creates a minimal Ubuntu Docker image with 
three ports linked to the Server's
host system and a username and password corresponding to the ones given to the Client.

5. The Server updates it's Nginx configuration file to create a new subdomain with ports 22, 80, and 443 forwarded
to the assigned ports.

6. When a Renter rents the device, they are emailed the username and password for the device.

7. When the Renter cancels their agreement, the Docker image and Nginx configuration are deleted from the server.
The Client re-registers itself back into the marketplace by repeating the process from Step 3.

It is not possible to make a reverse SSH call without giving the Client shell access to the Server. By restricting
the connection to a minimal Ubuntu Docker image, the server can be better protected against malicious users.