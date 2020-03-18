const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItnSchema = new Schema({
    name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('Itndept', ItnSchema);