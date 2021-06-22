//Host server or RPI address with port on which socket connection needs to be made 
const HOST = "https://192.168.29.175:3000/"

// Connection to server
var socket = io.connect(HOST, {
    reconnection: true
});

// For any basic messages from server
socket.on('message',message => {
    alert(message);
});


// UI comp
const startBtn = document.createElement("button");
startBtn.innerHTML = "Start listening";
const result = document.createElement("div");
const processing = document.createElement("p");

document.write("<body><h1>Helios AI</h1><p>Give it a try with 'hello', 'how are you', 'what's your name', 'what time is it', 'stop', 'turn on', 'turn off'... </p></body>"); 
document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);


// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.remove();
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = event => {
		const last = event.results.length - 1;
		const res = event.results[last];
		const text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "processing ....";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `You said: ${text} </br>Siri said: ${response}`;
			processing.innerHTML = "";
			result.appendChild(p);

			// text to speech
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
		} else {
			processing.innerHTML = `listening: ${text}`;
		}
	}
	let listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.textContent = "Start listening";
		} else {
			recognition.start();
			startBtn.textContent = "Stop listening";
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}

// processor
function process(rawText) {
	let text = rawText.replace(/\s/g, "");
	text = text.toLowerCase();
	let response = null;
	switch(text.toLowerCase()) {
		case "hello":
			response = "hi, how are you doing?"; break;
		case "what'syourname":
			response = "My name's Helios.";  break;
		case "howareyou":
			response = "I'm good."; break;
		case "whattimeisit":
			response = new Date().toLocaleTimeString(); break;
		case "turnon":
			socket.emit('open'); 
			response = "Turning the LED on ...."; 
			break;
		case "turnoff":
			socket.emit('off');
			response = "Turning the LED off ...."; 
			break;
		case "stop":
			response = "Bye!!";
			toggleBtn();
	}
	if (!response) {
		window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `I found some information for ${rawText}`;
	}
	return response;
}
