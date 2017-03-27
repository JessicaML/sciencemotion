var express = require('express'),
    bcrypt = require('bcryptjs'),
    db = require('../models'),
    router = express.Router();


//get new user page
router.get('/register', (req, res) => {
  if (req.session.user) {
    res.redirect('/posts');
  }
  res.render('users/new');
});


//post new user data
router.post('/users', (req, res) => {
  db.User.create(req.body).then((user) => {
    req.session.user = user;
    res.redirect('/');
  }).catch((error) => {
    res.render('users/new', { errors: error.errors });
  });
});

//gets login page
router.get('/login', (req, res) => {
  res.redirect('/admin/posts');
});


//post login user data, check pw is correct
router.post('/login', (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((userInDB) => {
    bcrypt.compare(req.body.password, userInDB.passwordDigest, (error, result) => {
      if (result) {
        req.session.user = userInDB;
        res.redirect('/');
      } else {
        res.render('login', { error: { message: 'Password is incorrect' } });
      }
    });
  }).catch((error) => {
    res.render('login', { error: { message: 'User not found in the database' } });
  });
});

//log out user
router.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
});

module.exports = router;
