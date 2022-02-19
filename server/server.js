let {PythonShell} = require('python-shell')
const express = require('express');
const app = express();


app.get("/api",(req,res,next)=>{
    let options = {
        mode: 'json'
    };
    PythonShell.run('iss.py', options, function (err, result) {
          if (err) throw err;
          // result is an array consisting of messages collected 
          //during execution of script.
          console.log('result: ', result);
          res.json({
              'lat': result[0],
              'lng': result[1],
              'alt': result[2]
          })
    });
});

const port=8000;
app.listen(port,()=>console.log(`Server connected to ${port}`));