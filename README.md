# Project Title
Voice controlled raspberryPI pins remotely

# Project Description

Voice control your raspberry pi pins remotely through a browser and some other voice command features like: who are you ?, what's your name, what time is it ?, turn on, turn off, etc.

# Setup
1. Connect a LED to GPIO pin 4 of raspberry pi
2. Clone the repo to your raspberryPi</li>
3. Install the following packages: </li>

* express
* socket.io
* onoff

4. Open file public > helios.js, and change the host address to your raspberry pi IP address, for example: https://192.150.20.121:3000/
5. Run command: 
`npm run heliosAI`

# Usage

Search your raspberry pi IP address with the port in chrome, for example: https://192.150.20.121:3000/ 
Use "Turn on" voice command to turn on the LED, and "turn off" tot rn int off
