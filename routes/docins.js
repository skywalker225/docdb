var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
// const passport = require('passport');
var title = 'NN Documents Recorder';

const Docin = require('../models/docin');


// Upload Library
var path = require('path');
const app = express();
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/docsin')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })


router.post('/add', upload.single('pdf_file'), async (req, res, next) => {

    // console.log(req.body);
    // console.log(req.file.path);

    const { doc_no, doc_date, doc_from, doc_to, doc_title, doc_urgency, doc_level, responsible, record_date, record_holder, comment} = req.body;
    const doc = req.file.path;

    // simple validation
    if (!doc_no || !doc_date || !doc_from || !doc_to || !doc_title || !doc_urgency || !doc_level || !responsible || !record_date || !record_holder || !doc) {
        return res.render('docin_add', { message: 'Please try again!' });
    }
  
    const docin = new Docin({
        // record,
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