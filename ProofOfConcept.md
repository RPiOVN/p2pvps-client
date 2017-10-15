This page captures notes I took while experimenting with *reverse ssh* and *ssh port forwarding*.

# Reverse SSH
These instructions are adapted from [this tutorial](https://www.howtoforge.com/reverse-ssh-tunneling). They show the steps
necessary to connect to a Raspberry Pi behind a series of firewalls by making a reverse SSH connection.

**Notes:**
* The raspberry pi is on my local network at 10.10.10.219 with username 'pi'
* My internet-connected server is a Digital Ocean Droplet at IP 45.55.12.52 with username 'trout'

**Steps**
1. On the RPi I run this command:
 
 `ssh -R 19999:localhost:22 trout@45.55.12.52`
 
 This will open an SSH connection between the RPi and the server. It will prompt me for the password to 'trout', 
 and then log me in under that user on the server.

2. Open a separate SSH terminal directly to the server. From there, enter this command:

`ssh -p 19999 pi@localhost`

This will open an SSH connection between the server and the RPi inside its network. It will prompt me for the 
password to user 'pi'.

3. As long as the connection in step 1 remains established, I can open and close connections using step 2.


# Port Forwarding using Reverse SSH
Instructions below are pieced together from the following tutorials:
* https://toic.org/blog/2009/reverse-ssh-port-forwarding/
* https://askubuntu.com/questions/50064/reverse-port-tunnelling

**Steps:**

1. Enable Gateway ports in the SSHd server.
  * `sudo nano /etc/ssh/sshd_config`
  * At the bottom add this: `GatewayPorts clientspecified`
  * Save the file and restart sshd with this command: `/etc/init.d/ssh restart`
  
2. On the RPi, establish a reverse SSH connection with port forwarding with this command:
`ssh -R 45.55.12.52:8000:localhost:80 trout@45.55.12.52`
This forwards port 80 on the RPi to port 8000 on the server (45.55.12.52). It will request the password for user 'trout'.

3. Access the webpage being served by the RPi on port 80 by calling http://45.55.12.52:8000



# Setting Up a Sub-Domain with NGINX
This solution comes from this Stack Overflow thread:
* http://stackoverflow.com/questions/23649444/redirect-subdomain-to-port-nginx-flask

1. Setup the GatewayPorts in the sshd_config file.

2. Setup a port 80 forwarding on the RPi to port 8080 on Droplet server:
   `ssh -R 107.170.227.211:8080:localhost:80 safeuser@107.170.227.211`

3. Add these lines to the nginx default file:
```
	server {
		listen 80;
		server_name rpi.christroutner.com;
	
		location / {
				proxy_pass http://christroutner.com:8080;
		}   
	}
```

4. Check the syntax of the file with this command:
  `sudo nginx -t`
  
5. If the syntax checks out, reboot the nginx service:
  `sudo service nginx restart`
  
6. Point a browser at rpi.christroutner.com



# Logging Into SSH Without a Password
source: http://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id

1. Create a user on the server. Assuming user '**user-ssh**' and server with IP **104.236.184.95**
2. On RPi: 'ssh-keygen' to generate key
3. On RPi: 'ssh-copy-id -i ~/.ssh/id_rsa.pub user-ssh@104.236.184.95'
4. Now log into server with 'ssh user-ssh@104.236.184.95' and a password should not be needed.



# Next Steps:
* Setup a subdomain on christroutner.com that points to an RPi. Proxy pass ports 80, 443, and 22.
