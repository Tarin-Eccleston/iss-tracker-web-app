let {PythonShell} = require('python-shell')
const express = require('express');
const app = express();

var lat = 0.0
var lng = 0.0
var alt = 0.0

let options = {
    mode: 'text',
    pythonOptions: ['-u']
};

var pyshell = new PythonShell('iss.py',options);

// run python script in the background
pyshell.on('message', function (message) {
    // received a message sent from the Python script 
    message = message.split(',', 3)
    lat = parseFloat(message[0])
    lng = parseFloat(message[1])
    alt = parseFloat(message[2])
    console.log("lat: ",lat);
    console.log("lng: ",lng);
    console.log("alt: ",alt);
});

// end the input stream and allow the process to exit 
pyshell.end(function (err) {
    if (err) throw err;
    console.log('finished');
});

// function call for server request from React client
app.get("/server",(req,res,next)=>{
    res.json({
        'lat': lat,
        'lng': lng,
        'alt': alt
    })
});

const port=8000;
app.listen(port,()=>console.log(`Server connected to ${port}`));