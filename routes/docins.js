var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
// const passport = require('passport');
var title = 'NN Documents Recorder';

const Docin = require('../models/docin');

router.post('/add', async (req, res, next) => {

    const { record, doc_no, doc_date, doc_from, doc_to, doc_title, doc_urgency, doc_level, responsible, record_date, record_holder, comment, doc } = req.body;
  
    // simple validation
    if (!record || !doc_no || !doc_date || !doc_from || !doc_to || !doc_title || !doc_urgency || !doc_level || !responsible || !record_date || !record_holder) {
        return res.render('docin_add', { message: 'Please try again!' });
    }
  
    const docin = new Docin({
        record,
        doc_no,
        doc_date,
        doc_from,
        doc_to,
        doc_title,
        doc_urgency,
        doc_level,
        responsible,
        record_date,
        record_holder,
        comment,
        doc
    });
  
    await docin.save();

    res.redirect('/docin_list');
});

module.exports = router;