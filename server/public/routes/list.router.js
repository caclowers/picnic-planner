const express = require('express');
const thing = require('../../models/list.schema.js');
const router = express.Router();

router.get('/', (request,response) => {
    console.log('line 6: got to toDoList GET ');
    thing.find({}).then((data) => {
        console.log('line 8: here is our data:', data);
        response.send(data);
    }).catch((error) => {
        console.log('line 11: thing GET error:', error);
        response.sendStatus(500);
    });
});

router.post('/', (request, response) => {
    console.log('line 17: got to thing POST');
    console.log('line 18: thing POST request.body is:', request.body);

    let newThing = new thing(request.body)
    
    newThing.save().then((data) => {
        console.log('line 23: POST data from Mongoose:', data);
        response.sendStatus(201);
    }).catch((error) => {
        console.log('line 26: thing POST error:', error.message);
        response.status(500).send(error.message);
    })  
});

// router.put('/:id', (req, res) => {
// 	const itemId = req.params.id;
// 	thing.findByIdAndUpdate({ '_id' : itemId}, {$set: {completed: true}})

router.put('/:id', (request, response) => {
    console.log('line 32: got to thing PUT');
    thing.findByIdAndUpdate(request.params.id, request.body)
    .then((data) => {
        console.log('line 35: data returned from Mongo:', data);
        response.sendStatus(201);
    }).catch((error) => {
        console.log('line 38: thing PUT request failed. Error:', error);
        response.status(500).send(error.message)
    })
    
});

router.delete('/:id', (request, response) => {
    console.log('line 45: here is the request.body for front end', request.body);
    thing.findByIdAndRemove({
        _id: request.params.id
    }).then((data) => {
        console.log('line 49: data returned from Mongo:', data);
        response.sendStatus(202);        
    }).catch((error) => {
        console.log('line 52: thing DELETE request failed. Error:', error);
        response.status(500).send(error.message);
    });
});

module.exports = router;