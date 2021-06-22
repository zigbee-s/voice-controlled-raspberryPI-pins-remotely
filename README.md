# voice-controlled-raspberryPI-pins-remotely

Voice control your raspberry pi pins remotely through a browser and some other voice command features like: who are you ?, what's your name, what time is it ?, turn on, turn off, etc.

# setup

<ol>
    <li>Clone the repo to your raspberryPi</li>
    <li>Install the following packages: </li>
    <ul>
        <li>express</li>
        <li>socket.io</li>
        <li>onoff</li>
    </ul>
    <li>Open file public > helios.js, and change the host address to your RPI IP address, for example: https://192.150.20.121:3000/
    <li>Run command: npm run heliosAI</li>
    <li>Use "turn on" command to turn the LED on and "turn off" to switch it off  
</ol>
