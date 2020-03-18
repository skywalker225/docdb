var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
// const passport = require('passport');
var title = 'NN Documents Recorder';

const Itndept = require('../models/internaldept');

router.post('/add', async (req, res, next) => {

    const { username, password, name } = req.body;
  
    // simple validation
    if (!name) {
      return res.render('register', { message: 'Please try again!' });
    }
  
    const intdept = new Itndept({
      name
    });
  
    await intdept.save();

    res.redirect('/itn_list');
});



// itn_list = function(res, req, next) {
//     Itndept.find({}, 'title itn')
//         .populate('name')
//         .exec(function (err, list_itns) {
//             if (err) { return next(err); }
//             res.render('int_list', { title: 'Itn List', itn_list: list_itns });
//         });
// }

module.exports = router;