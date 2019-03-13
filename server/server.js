const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const listRouter = require('./public/routes/list.router');
const mongoose = require('mongoose');
const databaseUrl = `mongodb://localhost:27017/picnic-planner`;

mongoose.connect(databaseUrl);

mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${databaseUrl}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`mongoose connection error ${error}`);
});

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/picnic-planner', listRouter);

app.listen(PORT, function(){
    console.log('app is running on port:', PORT);
});