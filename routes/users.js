var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const passport = require('passport');

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Challenge */
router.get('/cool/', function(req, res, next) {
  res.send('You\'re so cool');
});

router.post('/register', async (req, res) => {
  // const user = new User(req.body);
  // await user.save();
  // res.render('index', { user });

  const { username, password, name } = req.body;

  // simple validation
  if (!name || !username || !password) {
    return res.render('register', { message: 'Please try again!' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    username,
    password: passwordHash
  });

  await user.save();
  res.render('index', { user });
  res.status(200).send('Success');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
  }),
  async (req, res) => {
    const { username, password } = req.body;
    return res.redirect('/');
});
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   // simple validation')
//   if (!username || !password) {
//     return res.render('login', { message: 'Please try again!' });
//   }

//   const user = await User.findOne({
//     username
//   });

//   if (user){
//     const isMatch = bcrypt.compareSync(password, user.password);

//     if (isMatch) {
//       req.session.user = user;
//       return res.render('index', {user});
//     } else {
//       return res.render('login', { message: 'Username or Password incorrect!' });
//     }
//     // return res.render('index', { user });
//   } else {
//     return res.render('login', { message: 'Username does not exist!' });
//   }
// });

module.exports = router;
