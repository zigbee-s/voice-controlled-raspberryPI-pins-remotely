const express = require('express');  
const app = express();  
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

//Load environment variables
dotenv.config();

const PORT = 3000;

const options = {
	key: fs.readFileSync('encryption/key.pem'),
	cert: fs.readFileSync('encryption/cert.pem')
};

var server = require('https').createServer(options, app);  


var Gpio = require('onoff').Gpio; 
var LED = new Gpio(4, 'out');


const io = require("socket.io")(server);


server.listen(PORT,()=>{console.log(`Listening On... ${PORT}`)});

// Set static folder
app.use(express.static(path.join(__dirname,"public")));


app.get('/',(req,res) => {
    res.sendFile(__dirname +"/index.html");
})

//Listening on Sockets
io.on('connection',(socket)=>{
    socket.on('open',turnOn);
    socket.on('off',turnOff);

    //Functions
    function turnOn(){
	var LED = new Gpio(4, 'out');
        if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            LED.writeSync(1); //set pin state to 1 (turn LED on)
            console.log("turning On");
       }
    }
    
    function turnOff(){
	var LED = new Gpio(4, 'out');
        LED.writeSync(0); // Turn LED off
        LED.unexport(); // Unexport GPIO to free resources
        console.log("turning Off");
    }
})
