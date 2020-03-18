const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocaldeptSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String}
});

module.exports = mongoose.model('Localdept', LocaldeptSchema);