# voice-controlled-raspberryPI-pins-remotely

Voice control your raspberry pi pins remotely through a browser and some other voice command features like: who are you ?, what's your name, what time is it ?, turn on, turn off, etc.

# setup

<ol>
    <li>Connect a LED to GPIO pin 4 of raspberry pi
    <li>Clone the repo to your raspberryPi</li>
    <li>Install the following packages: </li>
    <ul>
        <li>express</li>
        <li>socket.io</li>
        <li>onoff</li>
    </ul>
    <li>Open file public > helios.js, and change the host address to your raspberry pi IP address, for example: https://192.150.20.121:3000/
    <li>Run command: npm run heliosAI</li>
</ol>

# play

Search your raspberry pi IP address with the port in chrome, for example: https://192.150.20.121:3000/.<br> 
Use "Turn on" voice command to turn on the LED, and "turn off" tot rn int off
