var express = require('express');  
var app = express();  
const path = require('path');
const fs = require('fs');

const options = {
	key: fs.readFileSync('encryption/key.pem'),
	cert: fs.readFileSync('emcryption/cert.pem')
};

var server = require('https').createServer(options, app);  


var Gpio = require('onoff').Gpio; 
var LED = new Gpio(4, 'out');

const io = require("socket.io")(server, {
    cors: {
      origin: "https://192.168.29.52/",
      methods: ["GET", "POST"]
    }
  });

const { PORT =3000 } = process.env;

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
        
        if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            LED.writeSync(1); //set pin state to 1 (turn LED on)
          } else {
            LED.writeSync(0); //set pin state to 0 (turn LED off)
          }
        
          console.log("turning On");
        }
        
    
    function turnOff(){
        
        LED.writeSync(0); // Turn LED off
        LED.unexport(); // Unexport GPIO to free resources
        console.log("turning Off");
       
       console.log("turning off");    
    }
})
