const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocinSchema = new Schema({
    record: {type: String},
    doc_no: {type: String, required: true, max: 20},
    doc_date: {type: Date, required: true},
    doc_from: {type: String},
    // doc_from: {type: Schema.Types.ObjectId, ref: 'Localdept', required: true},
    doc_to: {type: String},
    // doc_to: {type: String, required: true, enum: ['นายอำเภอ', 'อื่นๆ'], default: 'นายอำเภอ'},
    doc_title: {type: String, required: true},
    doc_urgency: {type: String, required: true, enum: ['ปกติ', 'ด่วน', 'ด่วนมาก', 'ด่วนที่สุด'], default: 'ปกติ'},
    doc_level: {type: String, required: true, enum: ['ปกติ', 'ลับ', 'ลับมาก', 'ลับที่สุด'], default: 'ลับ'},
    responsible: {type: String},
    // responsible: {type: Schema.Types.ObjectId, ref: 'Itndept', required: true},
    record_holder: {type: String, required: true},
    record_date: {type: Date, default: Date.now()},
    comment: {type: String, max: 100},
    doc: {type: String}
});

module.exports = mongoose.model('Docin', DocinSchema);