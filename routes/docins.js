var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
// const passport = require('passport');
var title = 'NN Documents Recorder';

const Docin = require('../models/docin');

router.post('/add', async (req, res, next) => {

    const { name, location } = req.body;
  
    // simple validation
    if (!name || !location) {
      return res.render('docin_add', { message: 'Please try again!' });
    }
  
    const localdept = new Localdept({
      name
    });
  
    await localdept.save();

    res.redirect('/docin_list');
});

module.exports = router;