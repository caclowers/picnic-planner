const express = require('express');
const Thing = require('../models/list.schema');
const router = express.Router();

router.get('/', (request,response) => {
    console.log('line 6: got to toDoList GET ');
    Thing.find({}).then((data) => {
        console.log('line 8: here is our data:', data);
        response.send(data);
    }).catch((error) => {
        console.log('line 11: Task GET error:', error);
        response.sendStatus(500);
    });
});

router.post('/', (request, response) => {
    console.log('line 17: got to Task POST');
    console.log('line 18: Task POST request.body is:', request.body);

    let newThing = new Thing(request.body)
    
    newThing.save().then((data) => {
        console.log('line 23: POST data from Mongoose:', data);
        response.sendStatus(201);
    }).catch((error) => {
        console.log('line 26: Task POST error:', error.message);
        response.status(500).send(error.message);
    })  
});

router.post('/register', (request, response) => {
  
});
// router.put('/:id', (req, res) => {
// 	const itemId = req.params.id;
// 	Task.findByIdAndUpdate({ '_id' : itemId}, {$set: {completed: true}})

router.put('/:id', (request, response) => {
    console.log('line 32: got to Task PUT');
    Thing.findByIdAndUpdate(request.params.id, request.body)
    .then((data) => {
        console.log('line 35: data returned from Mongo:', data);
        response.sendStatus(201);
    }).catch((error) => {
        console.log('line 38: Task PUT request failed. Error:', error);
        response.status(500).send(error.message)
    })
    
});

router.delete('/:id', (request, response) => {
    console.log('line 45: here is the request.body for front end', request.body);
    Thing.findByIdAndRemove({
        _id: request.params.id
    }).then((data) => {
        console.log('line 49: data returned from Mongo:', data);
        response.sendStatus(202);        
    }).catch((error) => {
        console.log('line 52: Task DELETE request failed. Error:', error);
        response.status(500).send(error.message);
    });
});

module.exports = router;