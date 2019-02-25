const express = require('express');

const app = express(); //makes a server app
const PORT = process.env.PORT || 5000;

// respond with assets
app.use(express.static('server/public'))//place above app.listen

// allow for incoming request
app.listen(PORT, function (){
    console.log('app is running on', PORT)
})
