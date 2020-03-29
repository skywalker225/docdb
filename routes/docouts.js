var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
// const passport = require('passport');
var title = 'NN Documents Recorder';

const Docout = require('../models/docout');


// Upload Library
var path = require('path');
const app = express();
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/docsout')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })


router.post('/add', upload.single('pdf_file'), async (req, res, next) => {

    // console.log(req.body);
    // console.log(req.file.path);

    const { doc_no, doc_date, doc_to, doc_from, doc_title, doc_urgency, doc_level, responsible, record_date, record_holder, comment} = req.body;
    const doc = req.file.path;

    // simple validation
    if (!doc_no || !doc_date || !doc_to || !doc_from || !doc_title || !doc_urgency || !doc_level || !responsible || !record_date || !record_holder || !doc) {
        return res.render('docin_add', { message: 'Please try again!' });
    }
  
    const docout = new Docout({
        // record,
        doc_no,
        doc_date,
        doc_to,
        doc_from,
        doc_title,
        doc_urgency,
        doc_level,
        responsible,
        record_date,
        record_holder,
        comment,
        doc
    });
  
    await docout.save();

    res.redirect('/docout_list');
});

module.exports = router;