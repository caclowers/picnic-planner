const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let thingSchema = new Schema({
    name: {type: String, required: true},
    number: {type: Number},
    person: {type: String},
    edit: {type: Boolean},
    completed: {type: Boolean, default: false} 
})


module.exports = mongoose.model('thing', thingSchema);