var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var title = 'NN Documents Recorder';

const Distoffice = require('../models/distoffice');

router.post('/add', async (req, res, next) => {

    const { name } = req.body;
  
    // simple validation
    if (!name) {
      return res.render('doffice_add', { message: 'Please try again!' });
    }
  
    const doffice = new Distoffice({
      name
    });
  
    await doffice.save();

    res.redirect('/doffice_list');
});

module.exports = router;