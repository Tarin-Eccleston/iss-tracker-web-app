const express = require('express')
const app = express()

// create route for api
app.get("/api", (req,res) => {
    res.json({"users": "tarin"})
})

app.listen(5000, () => {console.log("server started on port 5000")})