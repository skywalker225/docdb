var express = require('express');
var router = express.Router();
var itn_controller = require('../controllers/itnController.js');
var Itndept = require('../models/internaldept');
var title = 'NN Documents Recorder';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('home', { title: title, user: req.user });
});


// Internal Dept
router.get('/itn_list', isLoggedIn, async (req, res, next) => {
  const itns = await Itndept.find({});
  res.render('itn_list', { title: title, user: req.user, sub_title: 'รายชื่อหน่วยงานภายใน', itn_list: itns })
})

router.get('/itn_add', isLoggedIn, (req, res, next) => {
  res.render('itn_add', { title: title, user: req.user });
});

// router.get('/itn', isLoggedIn, itn_controller.itn_list);

// router.get('/itn', isLoggedIn, (req, res, next) => {
//   res.render('itn_list', { title: 'NN Documents Recorder', user: req.user });
// });


// Authentication
router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
