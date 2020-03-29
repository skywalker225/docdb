const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DofficeSchema = new Schema({
    name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('Distoffice', DofficeSchema);