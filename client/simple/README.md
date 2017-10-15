# Simple VPS
This is the simplest possible implementation of a Virtual Private Server (VPS). It spins up
a Raspbian-based Docker container with SSH shell access. There is no persistent storage,
so everything is held in memory and deleted if the device is rebooted. The SSH user also
does not have sudo privileges so is pretty strongly restricted in what they can do.

## Installation
1. Setup the Client program by running `npm install`.

2. Get your device GUID from the P2P VPS marketplace. This is provided in the *Owned Devices view* by clicking
the *+Add New Device* button. Paste this GUID into the `deviceGUID.json` file.

3. Generate the files you need by running `node registerDevice.js`. Take note of the username, password, and port.

4. Build the generated Dockerfile by running the bash script `./buildImage`.

5. Run the Dockercontainer, which will establish a reverse SSH connection, by running the bash script `./runImage`.

6. You can now make an SSH connection to your Raspberry Pi by connecting to the SSH server on the port
assigned to your device in step 3, using the computer generated username and password.