const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let thingSchema = new Schema({
    name: {type: String, required: true},
    number: {type: Number},
    person: {type: String},
    completed: {type: Boolean, default: false} 
})


module.exports = mongoose.model('Thing', thingSchema);