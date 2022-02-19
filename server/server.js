const express = require('express')
const app = express()

let {PythonShell} = require('python-shell')
// create route for api
app.get("/api", (req,res) => {
    PythonShell.runString('/iss.py', null, function(err,res) {
        if (err) throw err;
        console.log(res);
        console.log('finished');
    });
    res.json({'alt': res.alt, 'lat': res.lat, 'lng': res.lng})
})

app.listen(5000, () => {console.log("server started on port 5000")})