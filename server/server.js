let {PythonShell} = require('python-shell')
const express = require('express');
const app = express();

let options = {
    mode: 'json',
    pythonOptions: ['-u']
};

var pyshell = new PythonShell('iss.py',options);

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement) 
  console.log(message);
});

// end the input stream and allow the process to exit 
pyshell.end(function (err) {
    if (err) throw err;
    console.log('finished');
});


// app.get("/api",(req,res,next)=>{

//     PythonShell.run('iss.py', options, function (err, result) {
//           if (err) throw err;
//           // result is an array consisting of messages collected 
//           //during execution of script.
//           console.log('result: ', result);
//           res.json({
//               'lat': result[0],
//               'lng': result[1],
//               'alt': result[2]
//           })
//     });
// });

const port=8000;
app.listen(port,()=>console.log(`Server connected to ${port}`));