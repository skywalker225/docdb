var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const passport = require('passport');

const User = require('../models/user');

router.post('/register', async (req, res) => {

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

module.exports = router;
