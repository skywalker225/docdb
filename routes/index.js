var express = require('express');
var router = express.Router();

// const isLoggedIn = (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect('/login');
//   }
//   next();
// }
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index', { title: 'Express', user: req.user });
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Local DB' });
// });

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
